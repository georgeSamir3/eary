import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";
import AlertError from "../../shared/alertError";

const UpdateQuestion = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const token = auth.tokens.token;

  const [errors, setErrors] = useState([]);

  const [allQuestions, setAllQuestions] = useState([]);
  const [status, setStatus] = useState("active");
  const [questionName, setQuestionName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [answers, setAnswers] = useState([
    { text: "", priority: "", isValid: false },
    { text: "", priority: "", isValid: false },
    { text: "", priority: "", isValid: false },
    { text: "", priority: "", isValid: false },
  ]);

  // const [currQuestion, setCurrQuestion] = useState();

  const getQuestion = () => {
    const question = allQuestions.find(
      (question) => question.id === Number(id)
    );
    // console.log("question:", question);
    // setCurrQuestion(question);
    setQuestionName(question.name);
    setQuestionText(question.question);
    setAudioFile(question.audio_file);
    setAnswers(question.answers);
    // console.log(audioFile)
  };
  const handleAnswerChange = (index, field, value) => {
    setAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index][field] = value;
      return updatedAnswers;
    });
  };
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setAudioFile(event.target.files[0]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", questionName);
    data.append("question", questionText);
    data.append("audio_file", audioFile);
    answers.forEach((answer, index) => {
      data.append(`answers[${index}][text]`, answer.text);
      data.append(`answers[${index}][priority]`, answer.priority);
      data.append(`answers[${index}][isValid]`, answer.isValid);
    });
    data.append("status", status);

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:5000/api/questions/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors);
      });
  };
  const getAllQuestions = () => {
    axios
      .get("http://localhost:5000/api/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setAllQuestions(response.data.questions);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors);
      });
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    if (allQuestions.length > 0) {
      getQuestion();
    }
  }, [id, allQuestions]);

  return (
    <div className="login-container">
      <h1>Add New Question</h1>
      <AlertError errors={errors}></AlertError>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            required
            placeholder="Question Name"
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            required
            placeholder="Question Text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Audio File</Form.Label>
          <Form.Control type="file" required onChange={handleFileChange} />
        </Form.Group>

        {[0, 1, 2, 3].map((index) => (
          <div key={index}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder={`Answer ${index + 1}`}
                value={answers[index].text}
                onChange={(e) =>
                  handleAnswerChange(index, "text", e.target.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Priority"
                value={answers[index].priority}
                onChange={(e) =>
                  handleAnswerChange(index, "priority", e.target.value)
                }
              />
              <Form.Control
                as="select"
                required
                value={answers[index].isValid}
                onChange={(e) =>
                  handleAnswerChange(
                    index,
                    "isValid",
                    e.target.value === "true"
                  )
                }
              >
                <option value={false}>False</option>
                <option value={true}>True</option>
              </Form.Control>
            </Form.Group>
          </div>
        ))}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            required
            placeholder="active or inactive"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Group>
        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Question
        </Button>
      </Form>
    </div>
  );
};

export default UpdateQuestion;
