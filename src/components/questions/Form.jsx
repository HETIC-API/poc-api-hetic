import React, { useState } from "react";
import Question from "./Question";

const questionsArray = [
  {
    question: "Quelle est la différence entre require et import dans Node.js ?",
    answers: {
      a: "require est une méthode synchrone, import est une méthode asynchrone",
      b: "require est utilisé pour importer des modules CommonJS, import est utilisé pour importer des modules ES6",
      c: "require est obsolète, import est la méthode moderne recommandée",
    },
    response: "b",
  },
  {
    question: "Comment peut-on gérer les dépendances dans un projet Node.js ?",
    answers: {
      a: "En les stockant dans un fichier .dependencies",
      b: "En utilisant npm (Node Package Manager)",
      c: "En les ajoutant directement dans le code source",
    },
    response: "b",
  },
  {
    question: "Qu'est-ce que Express.js ?",
    answers: {
      a: "Un moteur de recherche web",
      b: "Un framework JavaScript pour construire des applications web",
      c: "Une bibliothèque pour manipuler les fichiers JSON",
    },
    response: "b",
  },
  {
    question:
      "Quel est le rôle de npm (Node Package Manager) dans un projet Node.js ?",
    answers: {
      a: "Gérer les packages et les dépendances du projet",
      b: "Compiler le code JavaScript en code machine",
      c: "Analyser les erreurs de syntaxe dans le code source",
    },
    response: "a",
  },
  {
    question:
      "Quelle est la différence entre app.get() et app.post() dans Express.js ?",
    answers: {
      a: "app.get() est utilisé pour recevoir des requêtes GET, app.post() pour recevoir des requêtes POST",
      b: "app.get() est utilisé pour envoyer des données au serveur, app.post() pour recevoir des données du serveur",
      c: "Il n'y a pas de différence, ils sont utilisés de la même manière",
    },
    response: "a",
  },
  {
    question:
      "Comment peut-on utiliser le module fs (File System) de Node.js ?",
    answers: {
      a: "Pour lire, écrire et manipuler des fichiers sur le système de fichiers",
      b: "Pour manipuler les fichiers audio dans un projet Node.js",
      c: "Pour générer des fichiers CSS à partir de fichiers HTML",
    },
    response: "a",
  },
  {
    question: "Quelle est l'utilité de la méthode async/await en Node.js ?",
    answers: {
      a: "Pour manipuler les fichiers audio de manière asynchrone",
      b: "Pour exécuter du code asynchrone de manière synchrone et plus lisible",
      c: "Pour ajouter des écouteurs d'événements asynchrones à des applications web",
    },
    response: "b",
  },
  {
    question:
      "Qu'est-ce que MongoDB et comment peut-on l'utiliser dans un projet Node.js ?",
    answers: {
      a: "MongoDB est une base de données relationnelle, on peut l'utiliser en utilisant le pilote MongoDB pour Node.js",
      b: "MongoDB est une base de données NoSQL, on peut l'utiliser en utilisant un pilote MongoDB comme Mongoose dans un projet Node.js",
      c: "MongoDB est un serveur de messagerie, on peut l'utiliser en utilisant le protocole IMAP dans un projet Node.js",
    },
    response: "b",
  },
];

export default function Form() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const isLastQuestion = currentIndex === questionsArray.length;

  return (
    <div>
      {isLastQuestion ? (
        <div>
          <h2>
            Score: {score} / {questionsArray.length}
          </h2>
        </div>
      ) : (
        <Question
          questionProp={questionsArray[currentIndex]}
          index={currentIndex}
          currentIndex={currentIndex}
          onNext={handleNextQuestion}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
