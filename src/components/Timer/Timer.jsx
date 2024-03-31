import React, { useState, useEffect, useCallback } from "react";
import timercss from "./Timer.module.css";

const Timer = ({ eventDate }) => {
    const [timeLeft, setTimeLeft] = useState({});
    const [isStarted, setIsStarted] = useState(false);

    const time = ["days", "hours", "minutes", "seconds"];
    const calculateTimeLeft = () => {
        const difference = +new Date(eventDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        if (difference < 0) {
            setIsStarted(true);
        }
        setTimeLeft(timeLeft);
    };

    const getTimeLeft = useCallback(() => {
        const timer = setTimeout(() => {
            calculateTimeLeft();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        getTimeLeft();
    }, [timeLeft]);

    return (
        <div className={timercss.mainContainer}>
            {!isStarted && <>
                {time.map((item, index) => {
                    return (
                        <div className={timercss.textContainer} key={index}>
                            <div className={timercss.timerContainer}>
                                <span className={timercss.textDigit}>{timeLeft[item]}</span>
                            </div>
                            <div className={timercss.textTimeFormat}>
                                <span>{item}</span>
                            </div>
                        </div>
                    );
                })}
            </>}
            {isStarted && <h1>Event has Started</h1>}
        </div>
    );
};

export default Timer;