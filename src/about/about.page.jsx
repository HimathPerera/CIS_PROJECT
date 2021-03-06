import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";
import Questions from "../shared/Questions/questions.component";
import "./about.style.css";

export default function About() {
  return (
    <div className="wrapper">
      <div className="progress">
        <ProgressBar completed={10} bgcolor="#0976bc" isLabelVisible={false} />
      </div>
      <div className="questions">
        <Questions />
      </div>
    </div>
  );
}
