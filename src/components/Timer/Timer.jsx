import { useState, useEffect } from 'react';
import "./Timer.scss"

export default function Timer() {
    const [time, setTime] = useState(120000);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        let interval;
        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 10;
                    } else {
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    const handleTimerControl = () => {
        setTimerOn(prev => !prev);
    };

    const formatTime = () => {
        const minutes = formatNumber(Math.floor(calcMinutes(time)));
        const seconds = formatNumber(Math.floor(calcSeconds(time)));
        const milliseconds = formatNumber(Math.floor(calcMilliseconds(time)));

        return `${minutes}:${seconds}:${milliseconds}`;
    };

    const calcMinutes = (time) => {
        return (time / 60000) % 60;
    };

    const calcSeconds = (time) => {
        return (time / 1000) % 60;
    };

    const calcMilliseconds = (time) => {
        return (time % 1000) / 10;
    };

    const formatNumber = (value) => {
        return value.toString().padStart(2, '0');
    };

    return (
        <div className="timer__container">
            <div>{formatTime()}</div>
            <button onClick={handleTimerControl}>{timerOn ? 'Pause' : 'Start'}</button>
        </div>
    );
}
