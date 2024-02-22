import { useState } from "react";
import { useEffect } from "react";
import "../Timer/Timer.scss";

export default function Question({ questionProp }) {
  const [display, setDisplay] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [isResponseCorrect, setIsResponseCorrect] = useState(null);
  const [answer, setAnswer] = useState({});
  const [time, setTime] = useState(120000);
  const [timerOn, setTimerOn] = useState(false);

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

  function handleDisplay() {
    setDisplay(true);
    setTimerOn(true);
    checkResponse();
    console.log(questionProp.question);
  }

  function checkResponse() {
    const newAnswer = {};
    for (const value in questionProp.question.answers) {
      if (value == questionProp.question.response) {
        newAnswer[value] = true;
      } else {
        newAnswer[value] = false;
      }
    }
    setAnswer(newAnswer);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(answer);
    if (answer[selectedAnswer] == true) {
      setIsResponseCorrect(true);
    } else {
      setIsResponseCorrect(false);
    }
    setDisplay("validate");
    setTime(120000);
    setTimerOn(false);
  }

  function handleChange(event) {
    setSelectedAnswer(event.target.value);
  }

  const answersList = [];
  for (const key in questionProp.question.answers) {
    if (Object.hasOwnProperty.call(questionProp.question.answers, key)) {
      answersList.push(
        <label key={key}>
          <input
            type="radio"
            name="answer"
            value={key}
            onChange={handleChange}
          />
          {questionProp.question.answers[key]}
        </label>
      );
    }
  }

  useEffect(() => {
    if (timerOn && time === 0) {
      setTimerOn(false);
    }
  }, [timerOn, setTimerOn, time]);

  return (
    <div>
      <div className="timer__container">
        <div>{formatTime()}</div>
      </div>
      {display == true ? (
        <div>
          <h3>{questionProp.question.question}</h3>
          <form onSubmit={handleSubmit}>
            {answersList}
            <button type="sumbit">Valider</button>
          </form>

          {isResponseCorrect === null ? (
            <p>EN ATTENTE DE REPONSE</p>
          ) : isResponseCorrect === true ? (
            <p>VRAI</p>
          ) : (
            <p>FAUX</p>
          )}
        </div>
      ) : display == "validate" ? (
        <div>
          <p>Validé</p>
        </div>
      ) : (
        <div>
          <button onClick={handleDisplay}>Commencer</button>
        </div>
      )}
    </div>
  );
}
