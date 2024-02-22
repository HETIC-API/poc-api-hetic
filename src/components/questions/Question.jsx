import { useState } from "react";

export default function Question(questionProp) {
  const [display, setDisplay] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [isResponseCorrect, setIsResponseCorrect] = useState(null);
  const [answer, setAnswer] = useState({});

  function handleDisplay() {
    setDisplay(true);
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

  return (
    <div>
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
