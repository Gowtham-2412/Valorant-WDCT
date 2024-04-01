import React from "react";
import Blkbtncss from "./blkbtn.module.css";

const Blkbtn = ({ text, onClick }) => {
  return (
    <button className={Blkbtncss.Blkbtn} onClick={onClick}>
      {text}
    </button>
  );
};

export default Blkbtn;
