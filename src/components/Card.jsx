import React from "react";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import contactcss from '../pages/Contact/Contact.module.css'
export const Card = ({ element = {}, index = 0 }) => {

    const { img = '', title = '', subtitle = '', linkedin = '', twitter = '', instagram = '' } = element || {}
    return (
        <div className={contactcss.card} key={index}>
            {img.length != 0 && <div className={contactcss.card__border}>
                <img
                    src={img}
                    className={contactcss.card__img}
                />
            </div>}
            {title.length != 0 && <h3 className={contactcss.card__name}>{title}</h3>}
            {subtitle.length != 0 && <h3 className={contactcss.card__name}>{subtitle}</h3>}
            <div className={contactcss.socials}>
                {instagram.length != 0 && <a href={linkedin} className={contactcss.iconAnchor}><FaInstagram className={contactcss.icons} style={{ fontSize: '30' }} /></a>}
                {linkedin.length != 0 && <a href={instagram} className={contactcss.iconAnchor}><CiLinkedin className={contactcss.icons} style={{ fontSize: '35' }} /></a>}
                {twitter.length != 0 && <a href={twitter} className={contactcss.iconAnchor}><FaXTwitter className={contactcss.icons} style={{ fontSize: '25' }} /></a>}
            </div>
        </div>
    )
}