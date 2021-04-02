import React, { useState } from "react";

import ProgressBar from "@ramonak/react-progress-bar";
import Questions from "../shared/Questions/questions.component";
import "./about.style.css";

export default function About() {
  const [precentage, setPrecentage] = useState(0);

  const completePrecentage = (precentage) => {
    setPrecentage(precentage);
    console.log(precentage);
  };

  return (
    <div className="wrapper">
      <div className="progress">
        <ProgressBar
          completed={precentage}
          bgcolor="#0976bc"
          isLabelVisible={false}
        />
      </div>
      <div className="questions">
        <Questions completedPrecentage={completePrecentage} />
      </div>
    </div>
  );
}
