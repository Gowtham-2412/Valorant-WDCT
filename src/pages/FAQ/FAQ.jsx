import React from "react";
import faqcss from "./FAQ.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { FAQ_DATA } from "../../util/constants";

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

  return (
    <div className={faqcss.faqs}>
      <Navbar />
      <div className={faqcss.faq_container}>
        <h1>FREQUENTLY ASKED QUESTIONS</h1>
        {FAQ_DATA.map((item, index) => (
          <FaqComponent
            key={item.id}
            id={item.id}
            question={item.question}
            para={item.para}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};
