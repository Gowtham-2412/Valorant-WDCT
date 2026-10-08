import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paymentQR from "../../assets/imgs/payment_qr.jpeg";
import Blkbtn from "../Buttons/blkbtn";
import Redbtn from "../Buttons/redBtn";
import EventDetails from "./EventDetails";
import Registercss from "./Register.module.css";
import { Spinner } from "react-bootstrap";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
//modal body for api

function MyVerticallyCenteredModal(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [contactNum, setContactNum] = useState("");

  const [payment, setPayment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState(false);
  const [resType, setResType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const submitForm = (event) => {
    console.log("submit form");
    event.preventDefault();
    //console.log(user);
    console.log(fullName, email, contactNum, payment);

    setIsLoading(true);

    if (
      fullName.length === 0 ||
      email.length === 0 ||
      contactNum.length === 0 ||
      payment.length === 0
    ) {
      toast.error("All fields are required");
      setFormError(true);
      setIsLoading(false);
      return;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
      toast.error("Enter a valid Email");
      setIsLoading(false);
      setFormError(true);

      return;
    }
    if (contactNum.length !== 10) {
      toast.error("Mobile Number should be of 10 digits");
      setIsLoading(false);
      setFormError(true);
      return;
    }

    if (payment.type === "application/pdf") {
      setFormError(true);
      toast.error("Attach Image format only");
      setIsLoading(false);
      return;
    }

    sendData();
  };

  const modalBody = () => {
    if (isLoading) {
      return (
        <p textAlign="center" align="center">
          <h3
            textAlign="center"
            align="center"
            className="fw-normal"
            style={{ fontFamily: "ValorantFont" }}
          >
            Submitting Registration ...
          </h3>
          <Spinner animation="border" className="mt-3" variant="danger" />
        </p>
      );
    } else {
      if (resType === "success") {
        return (
          <>
            <h2
              textAlign="center"
              align="center"
              className="fw-bold"
              id={Registercss.congrats}
            >
              Congratulations!
            </h2>
            <p className="modal_right_p">
              We have successfully received your registration for Valorant
              Gaming 2026. We will contact you very soon.
              <br />
              <br />
              Join the WhatsApp group if you haven't, through the link below for
              further updates and information regarding the event.
              <br />
              <br></br>
              <a
                href="https://chat.whatsapp.com/J2frOyvEaSgAN3JCNQAg23"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "underline",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Join WhatsApp Group
              </a>
              <br />
            </p>
          </>
        );
      } else if (resType === "exists") {
        return (
          <>
            <h1 className="gradient__text">Already Submitted !</h1>
            <p className="modal_right_p">
              You have already registered for Valorant Gaming 2026 with this
              account or mobile number. We will contact you very soon.
              <br />
              <br />
              Join the WhatsApp group if you haven't, through the link below for
              further updates and information regarding the event.
              <br />
              <a
                href="https://chat.whatsapp.com/J2frOyvEaSgAN3JCNQAg23"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "underline",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Join WhatsApp Group
              </a>
              <br />
            </p>
          </>
        );
      } else {
        if (error === "") {
          return (
            <>
              <h1 textAlign="center" align="center" className="fw-bold">
                Could Not Register !
              </h1>
              <h5
                style={{ textAlign: "center", fontWeight: 600 }}
                className="my-4"
              >
                Please try again after some time.
                <br />
              </h5>
            </>
          );
        } else {
          return (
            <>
              <h1 textAlign="center" align="center" className="fw-bold">
                Could Not Register !
              </h1>
              <h5
                style={{ textAlign: "center", fontWeight: 600 }}
                className="my-4"
              >
                {error}
                <br />
              </h5>
            </>
          );
        }
      }
    }
  };

  //sendData form
  const sendData = async (token) => {
    console.log("token sendData", token);
    setIsLoading(true);

    try {
      const regRef = collection(db, "registrations");

      // Check if user has already registered with this email or phone number
      const emailQuery = query(regRef, where("email", "==", email.trim().toLowerCase()));
      const phoneQuery = query(regRef, where("contact_number", "==", contactNum.trim()));

      const [emailSnapshot, phoneSnapshot] = await Promise.all([
        getDocs(emailQuery),
        getDocs(phoneQuery),
      ]);

      if (!emailSnapshot.empty || !phoneSnapshot.empty) {
        setResType("exists");
        setIsLoading(false);
        setIsOpen(true);
        return;
      }

      // 1. Upload payment screenshot to Cloudinary
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error(
          "Cloudinary credentials are not set. Please define REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET in .env"
        );
      }

      const uploadFormData = new FormData();
      uploadFormData.append("file", payment);
      uploadFormData.append("upload_preset", uploadPreset);
      uploadFormData.append("folder", "valorant_payments");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!cloudinaryRes.ok) {
        const errorData = await cloudinaryRes.json();
        throw new Error(
          errorData?.error?.message || "Failed to upload payment proof to Cloudinary."
        );
      }

      const cloudinaryJson = await cloudinaryRes.json();
      const paymentProofUrl = cloudinaryJson.secure_url;

      // 2. Save registration document with clickable URL in Firestore
      await addDoc(regRef, {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        contact_number: contactNum.trim(),
        payment_url: paymentProofUrl,
        payment_filename: payment.name || "payment_proof.jpg",
        registered_at: serverTimestamp(),
      });

      // 3. Automatically append row to Google Sheets
      const sheetsUrl = process.env.REACT_APP_GOOGLE_SHEETS_URL;
      if (sheetsUrl) {
        try {
          await fetch(sheetsUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
              name: fullName.trim(),
              email: email.trim().toLowerCase(),
              contact_number: contactNum.trim(),
              payment_url: paymentProofUrl,
              registered_at: new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              }),
            }),
          });
        } catch (sheetErr) {
          console.error("Google Sheets sync failed:", sheetErr);
        }
      }

      setResType("success");
      // Reset form fields
      setFullName("");
      setEmail("");
      setContactNum("");
      setPayment("");
    } catch (err) {
      console.error("Firebase registration error:", err);
      setError(err?.message || "Failed to submit registration. Please try again.");
      setResType("error");
    } finally {
      setIsLoading(false);
      setIsOpen(true);
    }
  };
  //form submit

  console.log(isOpen);
  return (
    <>
      <ToastContainer className={Registercss.toast1} theme="dark" />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={Registercss.modalheader}>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1>Register</h1>
          </Modal.Title>
          <CloseButton
            className={Registercss.Closebtn}
            onClick={props.onHide}
          />
        </Modal.Header>
        <Modal.Body className={Registercss.modalbody}>
          <div className={Registercss.container}>
            <div className={Registercss.formfields}>
              <Form onSubmit={(e) => submitForm(e)}>
                <Row className="mb-1">
                  <Form.Group
                    className="col-12 col-md-12 col-lg-12 my-2 mb-4"
                    id={Registercss.formgrop}
                    controlId="formGridEmail"
                  >
                    <Form.Label>
                      <h4>NAME</h4>
                    </Form.Label>
                    <Form.Control
                      className={Registercss.formbg}
                      type="text"
                      onChange={(text) => {
                        setFullName(text.target.value);
                      }}
                      value={fullName}
                      placeholder="Enter full name"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {fullName.length === 0 && "Please provide a valid name."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group
                    className="col-12 col-md-12 col-lg-12 my-2 mb-4"
                    controlId="formGridEmail"
                  >
                    <Form.Label>
                      <h4>EMAIL ID</h4>
                    </Form.Label>
                    <Form.Control
                      className={Registercss.formbg}
                      type="email"
                      onChange={(text) => {
                        setEmail(text.target.value);
                      }}
                      value={email}
                      placeholder="Enter email address"
                      required
                    />

                    <Form.Control.Feedback type="invalid">
                      {email.length === 0 && "Please provide a valid email."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-1">
                  <Form.Group
                    className="col-12 col-md-12 col-lg-12 my-2 mb-4"
                    controlId="formGridPassword"
                  >
                    <Form.Label>
                      <h4>PHONE NUMBER</h4>
                    </Form.Label>
                    <Form.Control
                      className={Registercss.formbg}
                      type="tel"
                      onChange={(text) => {
                        setContactNum(text.target.value);
                      }}
                      value={contactNum}
                      placeholder="Enter phone number"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {contactNum.length !== 10 &&
                        "Please provide a valid phone number."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className="col-12 col-md-12 col-lg-12 my-2 mb-4"
                    controlId="formFileLg"
                  >
                    <Form.Label className={Registercss.paymentlabel}>
                      <h4>PAYMENT PROOF</h4>
                    </Form.Label>
                    <Form.Control
                      className={Registercss.formbg}
                      onChange={(text) => {
                        setPayment(text.target.files[0]);
                      }}
                      accept="image/*"
                      type="file"
                      required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {payment.type === "application/pdf" &&
                        "Please select a valid image payment proof."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              className={Registercss.QrCode}
            >
              <h5>Scan the QR to pay</h5>
              <h5 style={{
                display:'flex'
              }}> <p style={{
                textDecoration: "line-through",
                marginRight: 5
              }}> Rs 99</p>(Rs 75/-)</h5>
              <img src={paymentQR} width={200} height={200} alt="Payment QR" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={Registercss.modalfooter}>
          <Blkbtn text="CLOSE" onClick={props.onHide} />

          {isLoading ? (
            <div
              className={Registercss.submitbtn}
              variant="primary"
              // type="submit"
            >
              <Spinner animation="border" size="lg" variant="danger" />
            </div>
          ) : (
            <div>
              <Redbtn
                text="SUBMIT "
                type="submit"
                onClick={submitForm}
              />
            </div>
          )}
        </Modal.Footer>
      </Modal>
      {/* Api Response Model */}
      <Modal
        show={isOpen}
        onHide={() => {
          setIsOpen(false);
          setResType("");
          setError("");
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={Registercss.responseModal}>
          <CloseButton
            onClick={() => setIsOpen(false)}
            className={Registercss.Closebtn}
            variant="danger"
          ></CloseButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body className={Registercss.responseModal}>
          {modalBody()}
        </Modal.Body>
        {/* <Button onClick={() => setIsOpen(false)}>Close</Button> */}
      </Modal>
    </>
  );
}

function Register() {
  const [RmodalShow, RsetModalShow] = React.useState(false);

  EventDetails();
  const handlebtn = () => {
    RsetModalShow(true);
    console.log("Hellooo");
  };

  return (
    <>
      <Redbtn text="Register!" onClick={handlebtn} />

      <MyVerticallyCenteredModal
        show={RmodalShow}
        onHide={() => RsetModalShow(false)}
      />
    </>
  );
}

export default Register;
