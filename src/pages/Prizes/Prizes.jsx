import React from "react";
import { Card } from "../../components/Card";
import EventDetails from "../../components/Modals/EventDetails";
import Register from "../../components/Modals/Register";
import { Navbar } from "../../components/Navbar/Navbar";
import prizecss from "./Prizes.module.css";
import { PRIZES_LIST } from "../../util/constants";


export const Prizes = () => {
  return (
    <div className={prizecss.prizes}>
      <Navbar />
      <div className={prizecss.box}>
        <div className={prizecss.prize_menu}>
          <h2 style={{
            color:'white'
          }}>PRIZES</h2>

          <div className={prizecss.cards_container}>
            {PRIZES_LIST.map((element, index) => {
              return <Card element={element} index={index} />;
            })}
          </div>
        </div>
      </div>
      <div className={prizecss.footer}>
        <EventDetails />
        <Register />
      </div>
    </div>
  );
};
