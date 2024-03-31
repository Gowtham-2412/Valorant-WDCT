import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import venue from "../src/assets/imgs/Venue.png";
import EventDetails from "./components/Modals/EventDetails";
import Register from "./components/Modals/Register";
import PropButton from "./components/Buttons/redBtn";
function App() {
  return (
    <div>
      <Register />
      <EventDetails />
    </div>
  );
}

export default App;
