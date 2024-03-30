import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Registercss from "./Register.module.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseButton from "react-bootstrap/CloseButton";

function MyVerticallyCenteredModal(props) {
  const [fullName, setFullName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [department, setDepartment] = useState("");
  const [payment, setPayment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resType, setResType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const [formVisible, setFormVisible] = useState(true);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={Registercss.modalheader}>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Register</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={Registercss.modalbody}>
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
              Please provide a valid name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            className="col-12 col-md-12 col-lg-12 my-2 mb-4"
            controlId="formGridPassword"
          >
            <Form.Label>
              <h4>EMAIL ID</h4>
            </Form.Label>
            <Form.Control
              type="email"
              onChange={(text) => {
                setEmail(text.target.value);
              }}
              value={email}
              placeholder="Enter email address"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-1">
          <Form.Group
            className="col-12 col-md-12 col-lg-12 my-2 mb-4"
            controlId="formGridEmail"
          >
            <Form.Label>
              <h4>PHONE NUMBER</h4>
            </Form.Label>
            <Form.Control
              type="tel"
              onChange={(text) => {
                setContactNum(text.target.value);
              }}
              value={contactNum}
              placeholder="Enter phone number"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            className="col-12 col-md-12 col-lg-12 my-2 mb-4"
            controlId="formFileLg"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Form.Label>
              <h4>PAYMENT PROOF</h4>
            </Form.Label>
            <Form.Control
              className={Registercss.payment}
              onChange={(text) => {
                setPayment(text.target.files[0]);
              }}
              accept="image/*"
              type="file"
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a valid image payemnt proof.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Modal.Body>
      <Modal.Footer className={Registercss.modalfooter}>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Register() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Register;
