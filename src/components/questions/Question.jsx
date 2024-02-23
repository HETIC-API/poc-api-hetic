import { useState, useEffect } from "react";
import "./questions.css";
export default function Question({
  questionProp,
  index,
  currentIndex,
  onNext,
  onAnswer,
}) {
  const [display, setDisplay] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [isResponseCorrect, setIsResponseCorrect] = useState("");
  const [answer, setAnswer] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    setQuestionIndex(currentIndex + 1);
    if (display) {
      checkResponse();
    }
  }, [currentIndex, display]);

  function handleDisplay() {
    setDisplay(true);
  }

  function checkResponse() {
    const newAnswer = {};
    for (const value in questionProp.answers) {
      if (value === questionProp.response) {
        newAnswer[value] = true;
      } else {
        newAnswer[value] = false;
      }
    }
    setAnswer(newAnswer);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (answer[selectedAnswer] === true) {
      setIsResponseCorrect("Bonne réponse");
      onAnswer(true);
    } else {
      setIsResponseCorrect("Mauvaise réponse");
      onAnswer(false);
    }
    setSelectedAnswer(null);
    setDisplay("validate");
  }

  function handleNextQuestion() {
    onNext();
    setSelectedAnswer("");
    setIsResponseCorrect("");
    setDisplay(true);
  }

  function handleChange(event) {
    setSelectedAnswer(event.target.value);
  }

  const answersList = [];
  for (const key in questionProp.answers) {
    if (Object.hasOwnProperty.call(questionProp.answers, key)) {
      answersList.push(
        <li>
          <label key={key}>
            <input
              type="radio"
              name="answer"
              value={key}
              checked={selectedAnswer === key}
              onChange={handleChange}
            />
            {questionProp.answers[key]}
          </label>
        </li>
      );
    }
  }

  return (
    <div>
      {currentIndex === index && (
        <>
          {display === true ? (
            <div id="questionContainer">
              <h3>
                Question {questionIndex}: {questionProp.question}
              </h3>
              <form onSubmit={handleSubmit}>
                <ul>{answersList}</ul>
                <button type="submit">Valider</button>
              </form>
              {isResponseCorrect && (
                <button onClick={handleNextQuestion}>Suivant</button>
              )}
            </div>
          ) : display === "validate" ? (
            <div>
              <p>Validé : {isResponseCorrect}</p>
              {isResponseCorrect && (
                <button onClick={handleNextQuestion}>Suivant</button>
              )}
            </div>
          ) : (
            <>
              {!isResponseCorrect && (
                <button onClick={handleDisplay}>Commencer</button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
