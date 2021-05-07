import React, { useState, useContext } from "react";
import "./questions.style.css";

import { AuthContext } from "../../context/auth-context";

export default function Questions({ completedPrecentage }) {
  const auth = useContext(AuthContext);
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
      ],
    },
    {
      questionText:
        "Are you satisfied with the health rules used for covid-19 at premises",
      questionId: 4,
      answerOptions: [
        { answerText: "Yes", value: 1 },
        { answerText: "No", value: 2 },
        { answerText: "average", value: 3 },
      ],
    },
    {
      questionText: "Are you interested in online shopping with Arpico?",
      questionId: 5,
      answerOptions: [
        { answerText: "Yes", value: 1 },
        { answerText: "No", value: 2 },
        { answerText: "average", value: 3 },
      ],
    },
    {
      questionText: " What is your most preferred way of online shopping??",
      questionId: 6,
      answerOptions: [
        { answerText: "Website", value: 1 },
        { answerText: "Viber/Whatsapp", value: 2 },
        { answerText: "Order By calls", value: 3 },
      ],
    },
    {
      questionText: "Do you think delivering is better than visiting premises",
      questionId: 7,
      answerOptions: [
        { answerText: "Yes", value: 1 },
        { answerText: "No", value: 2 },
        { answerText: "Average", value: 3 },
      ],
    },
    {
      questionText: "Which payment method do you prefe?",
      questionId: 8,
      answerOptions: [
        { answerText: "Cash", value: 1 },
        { answerText: "Credit card", value: 2 },
        { answerText: "e-money", value: 3 },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  let questionValue = [];
  const [precentage, setPresentage] = useState(12.5);
  const [End, setEnd] = useState(false);

  const nextQuestionHandler = async (value) => {
    questionValue.push(value);

    ///child to parent loading bar on screen
    setPresentage(precentage + 12.5);
    completedPrecentage(precentage);

    if (currentQuestion + 1 === 4) {
      try {
        const response = await fetch(
          "http://localhost:5000/questions/isComplete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isComplete: true,
              token: auth.token,
            }),
          }
        );

        await response.json();
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const response = await fetch(
        `http://localhost:5000/surway/questions/${currentQuestion + 1}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: questionValue[0],
          }),
        }
      );

      const responseData = await response.json();
      console.log("111", responseData);
    } catch (err) {
      console.log(err);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setEnd(true);
    }
  };

  if (End === true) {
    return <div className="end-section">Thank You for Your Valuable Time</div>;
    // return <div>hello</div>;
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
