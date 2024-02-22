import { useState } from 'react';
import Form from '../questions/Form';

export default function Quizz() {
    const [timerOn, setTimerOn] = useState(false);

    return (
        <div>
            <Form timerOn={timerOn} setTimerOn={setTimerOn} />
        </div>
    );
}
