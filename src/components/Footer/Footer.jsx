import React from "react";
import footercss from "./Footer.module.css";
import EventDetails from "../Modals/EventDetails";
import Register from "../Modals/Register";

export const Footer = () => {
  return (
    <div className={footercss.footer}>
      <EventDetails />
      <Register />
    </div>
  );
};
