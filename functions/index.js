const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

// Google Sheets Webhook URL deployed via Google Apps Script
const GOOGLE_SHEETS_WEBHOOK_URL =
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbw91Q9uHysDUp_hpdpzLbJHCjW7er-vG16ZMKSsVdPc53RxpX4Mod1pE9z7NBxt7f7v/exec";

/**
 * Cloud Function triggered on every Create, Update, or Delete
 * in the 'registrations' Firestore collection.
 */
exports.syncRegistrationsToSheets = onDocumentWritten(
  {
    document: "registrations/{docId}",
    region: "us-central1",
  },
  async (event) => {
    const docId = event.params.docId;
    const beforeSnap = event.data.before;
    const afterSnap = event.data.after;

    const beforeData = beforeSnap && beforeSnap.exists ? beforeSnap.data() : null;
    const afterData = afterSnap && afterSnap.exists ? afterSnap.data() : null;

    let action = "update";
    if (!beforeData && afterData) {
      action = "create";
    } else if (beforeData && !afterData) {
      action = "delete";
    }

    logger.info(`[Firestore Sync] Event detected for document "${docId}". Action: ${action}`);

    // If document was deleted
    if (action === "delete") {
      try {
        const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "delete",
            docId: docId,
          }),
        });
        const resText = await response.text();
        logger.info(`[Firestore Sync] Deleted row for docId ${docId}: ${resText}`);
      } catch (err) {
        logger.error(`[Firestore Sync] Failed to delete docId ${docId} from Google Sheets:`, err);
      }
      return;
    }

    // Format registered_at timestamp
    let registeredAtStr = "";
    if (afterData.registered_at) {
      if (typeof afterData.registered_at.toDate === "function") {
        registeredAtStr = afterData.registered_at.toDate().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
      } else if (afterData.registered_at instanceof Date) {
        registeredAtStr = afterData.registered_at.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
      } else {
        registeredAtStr = String(afterData.registered_at);
      }
    }

    const payload = {
      action: action,
      docId: docId,
      name: afterData.name || "",
      email: afterData.email || "",
      contact_number: afterData.contact_number || "",
      payment_url: afterData.payment_url || "",
      payment_filename: afterData.payment_filename || "",
      status: afterData.status || afterData.payment_status || "Pending",
      registered_at: registeredAtStr || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      updated_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ...afterData,
    };

    // Prevent recursive object issues if any complex fields exist
    delete payload._raw;

    try {
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resText = await response.text();
      logger.info(
        `[Firestore Sync] Successfully synced docId "${docId}" (${action}) to Google Sheets: ${resText}`
      );
    } catch (err) {
      logger.error(`[Firestore Sync] Failed to sync docId "${docId}" to Google Sheets:`, err);
    }
  }
);
