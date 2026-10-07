import React from "react";
import Eventcss from "./EventDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import venue from "../../assets/imgs/Venue.png";
import Register from "./Register";
import Blkbtn from "../Buttons/blkbtn";
import CloseButton from "react-bootstrap/CloseButton";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      enforceFocus="true"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={Eventcss.modalheader}>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 className={Eventcss.eventHead}>Event Details</h1>
        </Modal.Title>
        <CloseButton
          className={Eventcss.Closebtn}
          onClick={props.onHide}
          variant=""
        />
      </Modal.Header>
      <Modal.Body className={Eventcss.modalbody}>
        <div className={Eventcss.container}>
          <div className={Eventcss.imgBox}>
            <img className={Eventcss.venueimg} src={venue} alt="hguiguigb" />
          </div>
          <div className={Eventcss.eventDetails}>
            <div className={Eventcss.rows1}>
              <h4 className={Eventcss.ReventDet}>MATCH TYPE</h4>

              <h4 className={Eventcss.WeventDet}>- COMPETITIVE</h4>
            </div>
            <div className={Eventcss.rows2}>
              <h4 className={Eventcss.ReventDet}>VENUE</h4>
              <h4 className={Eventcss.WeventDet}>- NAB 402</h4>
            </div>
            <div className={Eventcss.rows3}>
              <h4 className={Eventcss.ReventDet}>TIME </h4>
              <h4 className={Eventcss.WeventDet}>
                - 10:00 AM - 5:00 PM, 11th October 2026
              </h4>
            </div>
            <div className={Eventcss.rows4}>
              <h4 className={Eventcss.ReventDet}>Description - </h4>
            </div>
            <div>
              <p className={Eventcss.descrip}>
                "Failure doesn't mean GAME OVER, it means try again with
                experience." Let's get, set ready to put your gaming skills into
                experience as in Aarohan 2026, Team Aavishkar brings to you one
                of the most awaited flagship event, Valorant Champions League.
                Get ready to showcase your gaming competence in Valorant as you
                compete against your college mates.
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={Eventcss.modalfooter}>
        <a href="Faq">
          <Blkbtn text="READ FAQS" />
        </a>
        <Register className={Eventcss.registerbtn} />
      </Modal.Footer>
    </Modal>
  );
}

function EventDetails() {
  const [EmodalShow, EsetModalShow] = React.useState(false);

  return (
    <>
      <Blkbtn text="EVENT DETAILS" onClick={() => EsetModalShow(true)} />

      <MyVerticallyCenteredModal
        show={EmodalShow}
        onHide={() => EsetModalShow(false)}
      />
    </>
  );
}

export default EventDetails;
