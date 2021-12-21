import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../assets/play.wav";
import correct from "../assets/correct.wav";
import wrong from "../assets/wrong.wav";

export default function Quiz({
  data,
  stopTimeOut,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    correctAnswer();
  }, [correctAnswer]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(answer.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (answer.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          stopTimeOut(true);
        });
      }
    });
  };

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((answer) => {
          return (
            <div
              className={selectedAnswer === answer ? className : "answer"}
              onClick={() => handleClick(answer)}
            >
              {answer.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
