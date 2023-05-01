import React, { Children, useEffect, useState } from "react";
import "./testCard.css";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const TestCard = ({ allQuestions }) => {
  console.log(allQuestions);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const navigate =useNavigate();

  const playAudio = (audioFile) => {
    console.log(audioFile)
    const audio = new Audio(audioFile);
    audio.play();
  };

  const handleAnswerOptionClick = (
    isCorrect,
    submittedAnswer,
    currentQuestion
  ) => {
    if (isCorrect === "1" || isCorrect === 1) {
      setScore(score + 1);
    }
    setAnswers((prevState) => [
      ...prevState,
      { questionId: currentQuestion, submittedAnswer },
    ]);
    console.log(answers);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < allQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // ----------------submission------------------
  let data = JSON.stringify({ answers });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:5000/api/submissions/submit-answers",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const submit = () => {
    axios
      .request(config)
      .then((response) => {
        console.log("submitted",JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      navigate("/")
  };
  useEffect(() => {
    console.log(answers);
  }, [answers]);
  return (
    <>
      <div className="TestCon">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {allQuestions.length}
            <button
              style={{ width: "fit-content", backgroundColor: "green" }}
              onClick={submit}
            >
              submit response
            </button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/
                {allQuestions.length}
              </div>
              <div className="question-text">
                {allQuestions[currentQuestion]?.question}
                <button
                  style={{ width: "fit-content", backgroundColor: "green" }}
                  onClick={() =>
                    playAudio(allQuestions[currentQuestion]?.audio_file)
                  }
                >
                  play audio
                </button>
              </div>
            </div>

            <div className="answer-section">
              {allQuestions[currentQuestion]?.answers?.map((answer, i) => (
                <button
                  key={i}
                  onClick={() =>
                    handleAnswerOptionClick(
                      answer?.isValid,
                      answer,
                      currentQuestion
                    )
                  }
                >
                  {answer?.text}
                  {console.log("ansewrs", answer?.text)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TestCard;
