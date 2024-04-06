import React from 'react'
import homecss from './Home.module.css';
import Timer from '../../components/Timer/Timer';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { EVENT_START_DATE } from '../../util/constants';

export const Home = () => {

    return (
        <div className={homecss.home}>
            <Navbar />
            <div className={homecss.main}>
                <h1>VALORANT</h1>
                <Timer eventDate={new Date(2024, 3, 8)} />
            </div>
            <Footer />
        </div>
    )
}
