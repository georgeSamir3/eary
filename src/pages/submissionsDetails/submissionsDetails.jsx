import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./submissionDetails.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";
import AlertError from "../../shared/alertError";
const SubmissionsDetails = () => {
  const { id } = useParams();
  console.log(id);
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [submission, setSubmission] = useState();
  const [errors, setErrors] = useState([]);

  const getDetailedSub = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:5000/api/submissions/details/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSubmission(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors);

      });
  };
  const subs = submission || [];
  useEffect(() => {
    getDetailedSub();
  }, []);
  useEffect(() => {
    console.log("sub 3", submission);
  }, [submission]);
  return (
    <>
    <div className="container">
      <AlertError errors={errors}></AlertError>
      <Card className="cardCon">
        {subs.map((sub, i) => {
          return (
            <>
              <Card.Body>
                <Card.Title>Question : {sub.questionText}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Ansewr validty : {sub.isValidAnswer === 1 ? "true" : "false"}
                </Card.Subtitle>
                <Card.Text>Ansewr : {sub.answerText}</Card.Text>
                <hr></hr>
              </Card.Body>
            </>
          );
        })}
      </Card>
      </div>
    </>
  );
};

export default SubmissionsDetails;
