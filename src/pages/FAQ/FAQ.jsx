import React from 'react';
import faqcss from './FAQ.module.css';
import { Navbar } from '../../components/Navbar/Navbar';

const FaqComponent = (props) => {
    return (
        <div className={faqcss.wrapper}>
            <div className={faqcss.collapsible}>
                <input type="checkbox" id={props.id} />
                <label htmlFor={props.id} className={`${faqcss.text_normal} ${faqcss.font_medium}`}>
                    {props.id ? props.id + '. ' : "No ID defined"}
                    {props.question ? props.question : "No Question defined"}
                    <div className={faqcss.arrow} />
                </label>

                <div className={faqcss.collapsible_text}>
                    <p>{props.para ? props.para : "No Para defined"}</p>
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
            para: "The capital of China is Beijing.",
        },
        {
            id: "3",
            question: "What is the capital of India?",
            para: "The capital of India is New Delhi.",
        },
        {
            id: "4",
            question: "What is the capital of West Indies?",
            para: "The capital of West Indies is Kingston.",
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
            </div>
        </div>
    );
};
