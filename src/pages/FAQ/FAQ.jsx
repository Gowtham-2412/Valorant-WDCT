import React from "react";
import faqcss from "./FAQ.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import EventDetails from "../../components/Modals/EventDetails";
import Register from "../../components/Modals/Register";

const FaqComponent = (props) => {
  return (
    <div className={faqcss.wrapper}>
      <div className={faqcss.collapsible}>
        <input type="checkbox" id={props.id} />
        <label
          htmlFor={props.id}
          className={`${faqcss.text_normal} ${faqcss.font_medium}`}
        >
          {props.id ? props.id + ". " : "No ID defined"}
          {props.question ? props.question : "No Question defined"}
          <div className={faqcss.arrow} />
        </label>

        <div className={faqcss.collapsible_text}>
          <p style={{
            color: "black",
          }}>{props.para ? props.para : "No Para defined"}</p>
        </div>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const faqData = [
    {
      id: "1",
      question: "What are the prerequisites for the tournament?",
      para: "All participants must bring their own laptop with valorant pre-installed. Particpants should bring their own gaming peripherals in the event as it won't be provided.",
    },
    {
      id: "2",
      question: "Will internet connection be provided or do I have to use my own network?",
      para: "Yes, high speed internet connection will be provided throughout the duration of the tournament.",
    },
    {
      id: "3",
      question: "Can I compete as part of a team or do I have to compete individually?",
      para: "There will be a team of 5 players. Each team will have a team leader who takes responsibility to complete the registration and payment for the team.",
    },
    {
      id: "4",
      question: "Is there a minimum rank or skill level required to participate in the Valorant tournament?",
      para: "Players of all ranks and levels can participate in the tournament.",
    },
  ];

  return (
    <div className={faqcss.faqs}>
      <Navbar />
      <div className={faqcss.faq_container}>
        <h1>FREQUENTLY ASKED QUESTIONS</h1>
        {faqData.map((item, index) => (
          <FaqComponent
            key={item.id}
            id={item.id}
            question={item.question}
            para={item.para}
          />
        ))}
      </div>
      <div className={faqcss.footer}>
        <EventDetails />
        <Register />
      </div>
    </div>
  );
};
