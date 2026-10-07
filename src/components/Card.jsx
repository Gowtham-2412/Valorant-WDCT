import React from "react";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import contactcss from "../pages/Contact/Contact.module.css";
export const Card = ({ element = {}, index = 0, className = "" }) => {
  const {
    img = "",
    title = "",
    subtitle = "",
    phone = "",
    linkedin = "",
    twitter = "",
    instagram = "",
  } = element || {};
  return (
    <div className={`${contactcss.card} ${className}`} key={index}>
      {img.length !== 0 && (
        <div className={contactcss.card__border}>

          <img src={img} className={contactcss.card__img} alt={title || "card"} />
        </div>
      )}
      {title.length !== 0 && <h3 className={contactcss.card__name}>{title}</h3>}
      {subtitle.length !== 0 && (
        <h3 className={contactcss.card__name}>{subtitle}</h3>
      )}
      {phone.length !== 0 && (
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className={contactcss.phone}
        >
          <FaPhoneAlt size={14} />
          <span>{phone}</span>
        </a>
      )}
      <div className={contactcss.socials}>
        {instagram.length !== 0 && (
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className={contactcss.iconAnchor}
          >
            <FaInstagram
              className={contactcss.icons}
              style={{ fontSize: "30" }}
            />
          </a>
        )}
        {linkedin.length !== 0 && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className={contactcss.iconAnchor}
          >
            <CiLinkedin
              className={contactcss.icons}
              style={{ fontSize: "35" }}
            />
          </a>
        )}
        {twitter.length !== 0 && (
          <a
            href={twitter}
            target="_blank"
            rel="noreferrer"
            className={contactcss.iconAnchor}
          >
            <FaXTwitter
              className={contactcss.icons}
              style={{ fontSize: "25" }}
            />
          </a>
        )}
      </div>
    </div>
  );
};
