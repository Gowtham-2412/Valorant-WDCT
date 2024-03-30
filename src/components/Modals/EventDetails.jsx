import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Eventcss from "./EventDetail.module.css";
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
      <Modal.Header closeButton className={Eventcss.modalheader}>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 className={Eventcss.eventHead}>Event Details</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={Eventcss.modalbody}>
        <img className={Eventcss.venueimg} src={venue} alt="hguiguigb" />
        <div className={Eventcss.eventDetails}>
          <div className={Eventcss.rows1}>
            <h4 className={Eventcss.ReventDet}>MATCH TYPE - </h4>
            <h4 className={Eventcss.WeventDet}> LOREN IPSUM</h4>
          </div>
          <div className={Eventcss.rows2}>
            <h4 className={Eventcss.ReventDet}>VENUE - </h4>
            <h4 className={Eventcss.WeventDet}> NAB 601</h4>
          </div>
          <div className={Eventcss.rows3}>
            <h4 className={Eventcss.ReventDet}>TIME - </h4>
            <h4 className={Eventcss.WeventDet}>
              {" "}
              10:00 PM - 3:00 AM 8th April ‘24
            </h4>
          </div>
          <div className={Eventcss.row4}>
            <h4 className={Eventcss.ReventDet}>Description - </h4>
          </div>
          <div>
            <p className={Eventcss.descrip}>
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
      <Modal.Footer className={Eventcss.modalfooter}>
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
