import Question from "./Question";

export default function Form({ timerOn, setTimerOn }) {
    const questionTest = {
        question: "lorem ipsum",
        answers: { a: "vgbhjn,kl", b: "nj,k" },
        response: "a",
    };

    return (
        <div>
            <Question questionProp={questionTest} timerOn={timerOn} setTimerOn={setTimerOn} />
        </div>
    );
}