import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./submissionDetails.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";
import AlertError from "../../shared/alertError";

const UserSubmissions = () => {
  const { id } = useParams();
  console.log(id);
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [submission, setSubmission] = useState();
  const [errors, setErrors] = useState([]);

  const getUserSubmission = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:5000/api/submissions/user/${id}`,
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
    getUserSubmission();
  }, []);
  useEffect(() => {
    console.log("admin subs", subs);
  }, [submission]);
  return (
    <Card className="cardCon">
      <AlertError errors={errors}></AlertError>
      {subs.length >= 1 &&
        subs.map((sub, i) => {
          return (
            <>
              <Card.Body>
                {/* --------check the response data and update below----- */}
                {/* <Card.Title>Question : {sub.questionText}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Ansewr validty : {sub.isValidAnswer === 1 ? "true" : "false"}
                </Card.Subtitle>
                <Card.Text>Ansewr : {sub.answerText}</Card.Text> */}
                <hr></hr>
              </Card.Body>
            </>
          );
        })}
        {subs.length===0&&<Card.Body><h1>nothing to show</h1></Card.Body>}
    </Card>
  );
};

export default UserSubmissions;
