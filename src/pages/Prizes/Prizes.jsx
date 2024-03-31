import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar';
import prizecss from './Prizes.module.css'
import cardImg from '../../assets/imgs/cca.png'
import { Card } from '../../components/Card';

const cardItems = [
    {
        img: cardImg,
        title: '1ST PRIZE',
        subtitle: 'blah blah blah'
    },
    {
        img: cardImg,
        title: '2ND PRIZE',
        subtitle: 'blah blah blah'
    },
    {
        img: cardImg,
        title: '3RD PRIZE',
        subtitle: 'blah blah blah'
    },
]

export const Prizes = () => {
    return (
        <div className={prizecss.prizes}>
            <Navbar />
            <div className={prizecss.box}>
                <div className={prizecss.prize_menu}>
                    <h2>PRIZES</h2>

                    <div className={prizecss.cards_container}>
                        {cardItems.map((element, index) => {
                            return (
                                <Card element={element} index={index} />
                            )
                        })}

                    </div>
                </div>
            </div>
            <div className={prizecss.footer}>
            </div>
        </div>
    )
}

