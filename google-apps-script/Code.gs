/**
 * Google Apps Script Webhook for Firestore Real-time Sync
 * Handles CREATE, UPDATE, and DELETE operations immediately without duplicate rows.
 *
 * Setup Instructions:
 * 1. Open your Google Sheet.
 * 2. Click "Extensions" > "Apps Script".
 * 3. Replace all existing code with this file.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Execute as: "Me".
 * 7. Who has access: "Anyone" (Required for webhooks).
 * 8. Click "Deploy" and authorize the script.
 * 9. Copy the Web app URL and use it in your Firebase Functions / .env.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests to avoid race conditions
  lock.tryLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming JSON payload
    var contents = e.postData.contents;
    var data = JSON.parse(contents);

    var action = (data.action || "create").toLowerCase();
    var docId = data.docId || "";
    var name = data.name || "";
    var email = (data.email || "").toLowerCase();
    var contactNum = data.contact_number || "";
    var paymentUrl = data.payment_url || "";
    var status = data.status || data.payment_status || "Pending";
    var registeredAt = data.registered_at || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var updatedAt = data.updated_at || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Initialize Headers if sheet is brand new / empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Firestore Doc ID",
        "Full Name",
        "Email",
        "Contact Number",
        "Payment Proof URL",
        "Status",
        "Registered At",
        "Last Updated"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1a1a2e");
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    var lastRow = sheet.getLastRow();
    var rowIndex = -1;

    // Search for existing row matching docId (or email as fallback)
    if (lastRow > 1) {
      var idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      var emailValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();

      for (var i = 0; i < idValues.length; i++) {
        var currentDocId = String(idValues[i][0]).trim();
        var currentEmail = String(emailValues[i][0]).trim().toLowerCase();

        if (docId && currentDocId === docId) {
          rowIndex = i + 2; // +2 because 1-indexed and skipping header
          break;
        } else if (!docId && email && currentEmail === email) {
          rowIndex = i + 2;
          break;
        }
      }
    }

    // 1. DELETE ACTION
    if (action === "delete") {
      if (rowIndex !== -1) {
        // Mark status as DELETED and strike-through
        sheet.getRange(rowIndex, 6).setValue("DELETED");
        sheet.getRange(rowIndex, 8).setValue(updatedAt);
        sheet.getRange(rowIndex, 1, 1, 8).setFontColor("#888888");
        return responseJson({ status: "success", action: "delete", message: "Row marked as DELETED", row: rowIndex });
      } else {
        return responseJson({ status: "success", action: "delete", message: "Doc ID not found in sheet" });
      }
    }

    // 2. UPDATE ACTION (or existing row found on CREATE)
    if (rowIndex !== -1) {
      if (docId) sheet.getRange(rowIndex, 1).setValue(docId);
      if (name) sheet.getRange(rowIndex, 2).setValue(name);
      if (email) sheet.getRange(rowIndex, 3).setValue(email);
      if (contactNum) sheet.getRange(rowIndex, 4).setValue(contactNum);
      if (paymentUrl) sheet.getRange(rowIndex, 5).setValue(paymentUrl);
      sheet.getRange(rowIndex, 6).setValue(status);
      if (data.registered_at) sheet.getRange(rowIndex, 7).setValue(registeredAt);
      sheet.getRange(rowIndex, 8).setValue(updatedAt);

      return responseJson({
        status: "success",
        action: "updated",
        message: "Existing row updated in-place",
        row: rowIndex
      });
    }

    // 3. CREATE ACTION (new row)
    sheet.appendRow([
      docId,
      name,
      email,
      contactNum,
      paymentUrl,
      status,
      registeredAt,
      updatedAt
    ]);

    return responseJson({
      status: "success",
      action: "created",
      message: "New row appended",
      row: sheet.getLastRow()
    });

  } catch (error) {
    return responseJson({ status: "error", message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

// Health check GET endpoint
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "online", message: "Google Sheets Webhook is active and listening for Firestore events." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function responseJson(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
