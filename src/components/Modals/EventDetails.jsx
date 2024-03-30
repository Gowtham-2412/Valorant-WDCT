import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import "./EventDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import venue from "../../assets/imgs/Venue.png";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      enforceFocus="true"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 className="eventHead">Event Details</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalbody">
        <img className="venueimg" src={venue} alt="hguiguigb" />
        <div className="eventDetails">
          <div className="rows1">
            <h4 className="ReventDet">MATCH TYPE - </h4>
            <h4 className="WeventDet"> LOREN IPSUM</h4>
          </div>
          <div className="rows2">
            <h4 className="ReventDet">VENUE - </h4>
            <h4 className="WeventDet"> NAB 601</h4>
          </div>
          <div className="rows3">
            <h4 className="ReventDet">TIME - </h4>
            <h4 className="WeventDet"> 10:00 PM - 3:00 AM 8th April ‘24</h4>
          </div>
          <div className="rows4 ">
            <h4 className="ReventDet">Description - </h4>
          </div>
          <div>
            <p className="descrip">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
              justo eget sapien aliquet vehicula. Nullam sit amet felis eget
              nulla fermentum cursus. Cras condimentum ipsum vitae purus
              malesuada, id suscipit nisi ultricies. Sed id metus ac justo
              mollis consectetur. Proin id ante sed velit aliquet tempus. Nulla
              facilisi. Curabitur hendrerit, leo eu fringilla vestibulum, risus
              eros consequat eros, vitae molestie lorem ipsum in elit.{" "}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EventDetails() {
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

export default EventDetails;
