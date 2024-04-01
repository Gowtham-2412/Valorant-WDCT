import React from 'react'
import homecss from './Home.module.css';
import Timer from '../../components/Timer/Timer';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';

export const Home = () => {

    return (
        <div className={homecss.home}>
            <Navbar />
            <div className={homecss.main}>
                <h1>VALORANT</h1>
                <Timer eventDate={new Date(2024, 3, 2)} />
            </div>
            <Footer />
        </div>
    )
}
