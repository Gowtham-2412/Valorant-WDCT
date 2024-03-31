import React from 'react'
import homecss from './Home.module.css';
import Timer from '../../components/Timer/Timer';

export const Home = () => {

    return (
        <div className={homecss.main}>
            <h1>VALORANT</h1>
            <Timer eventDate={new Date(2024, 3, 2)} />
        </div>
    )
}
