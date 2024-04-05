import axios from "axios";
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
import ReCAPTCHA from "react-google-recaptcha";
const SITE_KEY = "6LfDoLEpAAAAAI3LGKc65_BVrEF6FnLgby2uNFv-";
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
              Gaming 2024. We will contact you very soon.
              <br />
              <br />
              Join the WhatsApp group if you haven't, through the link below for
              further updates and information regarding the event.
              <br />
              <br></br>
              <a
                href="https://chat.whatsapp.com/HRjeqmPjE916fB95z2QQ3R"
                target="blank"
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
              You have already registered for Valorant Gaming 2024 with this
              account or mobile number. We will contact you very soon.
              <br />
              <br />
              Join the WhatsApp group if you haven't, through the link below for
              further updates and information regarding the event.
              <br />
              <a
                href="https://chat.whatsapp.com/HRjeqmPjE916fB95z2QQ3R"
                target="blank"
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
  const sendData = (token) => {
    // let formData = new FormData();
    console.log("token sendData", token);
    // formData.entr
    setIsLoading(true);

    let formData = {
      email: email,
      name: fullName,

      contact_number: contactNum,

      payment: payment,
    };

    console.log("form Data", formData);
    // return

    var config = {
      method: "post",
      // url: "https://ccaaudition.ccanitd.in/api/auditions",
      url: "https://ccaaudition.ccanitd.in/api/valorantgamingregistrionscc244b9737c2b6ef26bd0f7827653c9d27c10b7c",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 201) {
          setResType("success");
        }
        setIsLoading(false);
        setIsOpen(true);
      })
      .catch(function (error) {
        const r = error.response.data.message;
        if (r?.email || r?.contact_number) {
          setResType("exists");
        } else {
          setResType("error");
        }
        setIsLoading(false);
        setIsOpen(true);
      });
  };
  //form submit

  console.log(isOpen);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  function onChange(value) {
    console.log("Captcha value:", value);
    setIsCaptchaVerified(true);
  }
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
                      <h4>TEAM NAME</h4>
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
                    <ReCAPTCHA
                      className={Registercss.recaptcha}
                      sitekey={SITE_KEY}
                      onChange={onChange}
                    />
                    ,
                  </Form.Group>
                </Row>
              </Form>
              ,
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
              <h5>Scan the QR to pay (Rs 149/-)</h5>
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
                disabled={!isCaptchaVerified}
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
