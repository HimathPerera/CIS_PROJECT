import React, { useState } from "react";
import "./questions.style.css";

export default function Questions() {
  const questions = [
    {
      questionText: "What is your shopping frequency?",
      questionId: 1,
      answerOptions: [
        { answerText: "1-3 per month", value: 1 },
        { answerText: "3-5 per month", value: 2 },
        { answerText: "5-7 per month", value: 3 },
        { answerText: "above 7", value: 4 },
      ],
    },
    {
      questionText: "What are the items you buy most?",
      questionId: 2,
      answerOptions: [
        { answerText: "FMCG(fast moving goods)", value: 1 },
        { answerText: "GM(General materials)", value: 2 },
        { answerText: "Furniture ", value: 3 },
      ],
    },
    {
      questionText: "What is the method of transportation you use?",
      questionId: 3,
      answerOptions: [
        { answerText: "Personal vehicle", value: 1 },
        { answerText: "Hired vehicle", value: 2 },
        { answerText: "Public transport", value: 3 },
        { answerText: "By foot", value: 4 },
      ],
    },
    {
      questionText:
        "Are you satisfied with the health rules used for covid-19 at premises",
      questionId: 4,
      answerOptions: [
        { answerText: "Yes", value: 1 },
        { answerText: "No", value: 2 },
        { answerText: "Average", value: 3 },
        { answerText: "Great", value: 4 },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionValue, setquestionValue] = useState(0);
  const [End, setEnd] = useState(false);

  console.log(questionValue);
  const nextQuestionHandler = (value) => {
    setquestionValue({ ...questionValue, value });
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setEnd(true);
    }
  };

  if (End === true) {
    return <div className="end-section">Thank You for Your Valuable Time</div>;
  } else {
    return (
      <div className="app">
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion].questionText}
          </div>
        </div>
        <div className="answer-section">
          {questions[currentQuestion].answerOptions.map((answer) => (
            <button
              onClick={() => nextQuestionHandler(answer.value)}
              key={answer.answerText}
            >
              {answer.answerText}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
