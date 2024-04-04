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
      question: "What is the capital of France?",
      para: "The capital of France is Paris.",
    },
    {
      id: "2",
      question: "What is the capital of China?",
      para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: "3",
      question: "What is the capital of India?",
      para: "The capital of India is New Delhi.",
    },
    {
      id: "4",
      question: "What is the capital of West Indies?",
      para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
