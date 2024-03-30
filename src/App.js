import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import venue from "../src/assets/imgs/Venue.png";
import EventDetails from "./components/Modals/EventDetails";
import Register from "./components/Modals/Register";

function App() {
  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
