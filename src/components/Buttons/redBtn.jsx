import React from "react";
import Redbtncss from "./redbtn.module.css"; // Assuming Redbtncss module contains your CSS styles

const Redbtn = ({ text, onClick, disabled }) => {
  return (
    <button
      className={`${Redbtncss.Redbtn} ${disabled ? Redbtncss.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Redbtn;
