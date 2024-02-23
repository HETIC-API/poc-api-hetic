import React, { useState, useEffect } from "react";
import "./questions.css";
import "./Timer.scss";

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
  const [time, setTime] = useState(120000);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    setQuestionIndex(currentIndex + 1);
    if (display) {
      setTimerOn(true);
    }
  }, [currentIndex, display]);

  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
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

  useEffect(() => {
    if (timerOn && time === 0) {
      setTimerOn(false);
      setIsResponseCorrect("Temps écoulé : Répondez plus rapidement !");
      onAnswer(false);
      setDisplay("validate");
    }
  }, [timerOn, time]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        setIsResponseCorrect("Mauvaise réponse, pourquoi tu quittes la page?");
        onAnswer(false);
      }
      setSelectedAnswer(null);
      setDisplay("validate");
      setTimerOn(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
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
    setTimerOn(false);
  }

  function handleNextQuestion() {
    onNext();
    setSelectedAnswer("");
    setIsResponseCorrect("");
    setDisplay(true);
    setTime(120000);
  }

  function handleChange(event) {
    setSelectedAnswer(event.target.value);
  }

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
    return value.toString().padStart(2, "0");
  };

  const answersList = [];
  for (const key in questionProp.answers) {
    if (Object.hasOwnProperty.call(questionProp.answers, key)) {
      answersList.push(
        <li key={key}>
          <label>
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
      <div className="timer__container">
        <p>Temps : {formatTime()}</p>
      </div>
      {currentIndex === index && (
        <>
          {display === true ? (
            <div id="questionContainer">
              <h3>
                Question {questionIndex}: {questionProp.question}
              </h3>
              <form onSubmit={handleSubmit}>
                <div class="checkbox-wrapper-13">
                  <ul>{answersList}</ul>
                </div>
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
