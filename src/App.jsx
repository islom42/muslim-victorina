import React from "react";
import { useState, useEffect, useMemo } from "react";
import "./app.css";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./Start";

export default function App() {
  const [username, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, stopTimeOut] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Islom diniga qachon asos solingan ?",
      answers: [
        {
          text: "2",
          correct: false,
        },
        {
          text: "1",
          correct: true,
        },
        {
          text: "2",
          correct: false,
        },
        {
          text: "2",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "Islom so'zinig ma'nosi ?",
      answers: [
        {
          text: "1",
          correct: false,
        },
        {
          text: "1",
          correct: false,
        },
        {
          text: "2",
          correct: true,
        },
        {
          text: "1",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "3",
      answers: [
        {
          text: "3",
          correct: true,
        },
        {
          text: "4",
          correct: false,
        },
        {
          text: "4",
          correct: false,
        },
        {
          text: "4",
          correct: false,
        },
      ],
    },
  ];
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1000" },
        { id: 6, amount: "$ 2000" },
        { id: 7, amount: "$ 4000" },
        { id: 8, amount: "$ 8000" },
        { id: 9, amount: "$ 16000" },
        { id: 10, amount: "$ 32000" },
        { id: 11, amount: "$ 64000" },
        { id: 12, amount: "$ 125000" },
        { id: 13, amount: "$ 250000" },
        { id: 14, amount: "$ 500000" },
        { id: 15, amount: "$ 1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        moneyPyramid.find((item) => item.id === questionNumber - 1).amount
      );
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="container">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="lose-game">Sizni pulingiz {earned} </h1>
            ) : (
              <>
                <div className="main__top">
                  <div className="timer">
                    <Timer
                      stopTimeOut={stopTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="main__bottom">
                  <Quiz
                    data={data}
                    stopTimeOut={stopTimeOut}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="pyramid__moneyList">
              {moneyPyramid.map((item) => {
                return (
                  <li
                    className={
                      questionNumber === item.id
                        ? "pryramid__moneyList-item active"
                        : "pryramid__moneyList-item"
                    }
                  >
                    <span className="moneyList-item__number">{item.id}</span>
                    <span className="moneyList-item__amount">
                      {item.amount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}
