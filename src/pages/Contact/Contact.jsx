import React from "react";
import contactcss from "../Contact/Contact.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Card } from "../../components/Card";
import EventDetails from "../../components/Modals/EventDetails";
import Register from "../../components/Modals/Register";
import { CONTACT_LIST } from "../../util/constants";


export const Contact = () => {
  return (
    <div className={contactcss.contact}>
      <Navbar />
      <div className={contactcss.box}>
        <div className={contactcss.contactUs}>
          <h2
            style={{
              color: "white",
            }}
          >
            Contact Us
          </h2>

          <div className={contactcss.cards_container}>
            {CONTACT_LIST.map((element, index) => {
              return <Card element={element} index={index} />;
            })}
          </div>
        </div>
      </div>
      <div className={contactcss.footer}>
        <EventDetails />
        <Register />
      </div>
    </div>
  );
};
