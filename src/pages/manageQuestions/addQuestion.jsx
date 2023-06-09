import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertError from "../../shared/alertError";
const AddQuestion = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [questionName, setQuestionName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [status, setStatus] = useState("active");
  const [answers, setAnswers] = useState([
    { text: "", priority: "", isValid: false },
    { text: "", priority: "", isValid: false },
    { text: "", priority: "", isValid: false },
    { text: "", priority: "", isValid: false },
  ]);
  const [errors, setErrors] = useState([]);
  
  const handleAnswerChange = (index, field, value) => {
    setAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index][field] = value;
      return updatedAnswers;
    });
  };

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
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
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:5000/api/questions",
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
    if (!errors) {
      navigate("/");
    }
  };

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
          Add New Question
        </Button>
      </Form>
    </div>
  );
};

export default AddQuestion;
