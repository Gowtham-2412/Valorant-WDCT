import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import venue from "../src/assets/imgs/Venue.png";
import EventDetails from "./components/Modals/EventDetails";

function App() {
  return (
    <div>
      <EventDetails />
    </div>
  );
}

export default App;
