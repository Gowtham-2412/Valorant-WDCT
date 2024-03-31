import React from 'react'
import contactcss from '../Contact/Contact.module.css'
import cardImg from '../../assets/imgs/arhn.jpg'
import { Navbar } from '../../components/Navbar/Navbar';
import { Card } from '../../components/Card';

const cardItems = [
    {
        img: cardImg,
        title: 'Saikat Sarkar',
        linkedin: 'https://evaboot.com/blog/linkedin-url-example',
        instagram: 'https://evaboot.com/blog/linkedin-url-example',
        twitter: 'https://evaboot.com/blog/linkedin-url-example'
    },
    {
        img: cardImg,
        title: 'Arya Sah',
        linkedin: 'https://evaboot.com/blog/linkedin-url-example',
        instagram: 'https://evaboot.com/blog/linkedin-url-example',
        twitter: 'https://evaboot.com/blog/linkedin-url-example'
    },
    {
        img: cardImg,
        title: 'Rishav Jha',
        linkedin: 'https://evaboot.com/blog/linkedin-url-example',
        instagram: 'https://evaboot.com/blog/linkedin-url-example',
        twitter: 'https://evaboot.com/blog/linkedin-url-example'
    },
    {
        img: cardImg,
        title: 'Somwrik Dubey',
        linkedin: 'https://evaboot.com/blog/linkedin-url-example',
        instagram: 'https://evaboot.com/blog/linkedin-url-example',
        twitter: 'https://evaboot.com/blog/linkedin-url-example'
    },
]


export const Contact = () => {
    return (
        <div className={contactcss.contact}>
            <Navbar />
            <div className={contactcss.box}>
                <div className={contactcss.contactUs}>
                    <h2>Contact Us</h2>

                    <div className={contactcss.cards_container}>
                        {cardItems.map((element, index) => {
                            return (
                                <Card element={element} index={index} />
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={contactcss.footer}>
            </div>
        </div>
    )
}
