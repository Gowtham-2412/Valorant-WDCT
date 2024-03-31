import React from "react";
import Redbtncss from "./redbtn.module.css";

const Redbtn = ({ text, onClick }) => {
  return (
    <button className={Redbtncss.Redbtn} onClick={onClick}>
      {text}
    </button>
  );
};

export default Redbtn;
