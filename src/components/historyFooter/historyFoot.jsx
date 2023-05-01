import React, { useEffect, useState } from "react";
import "./historyFoot.css";
import { Accordion } from "react-bootstrap";
import Accord from "../accordion/accordion";
import data from "../../assets/data.json";
import { MDBFooter } from "mdb-react-ui-kit";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { Link } from "react-router-dom";

const HistoryFoot = () => {
  const auth = getAuthUser();
  console.log("auth", auth);
  const token = auth.tokens.token;
  const [mySubmissions, setMySubmissions] = useState([]);
  const [detailedSub, setDetailedSub] = useState([]);
  const [evaluation, setEvaluation] = useState("bad hearing");
  const historyData = data.user1history;

  const getEvaluation = () => {
    console.log("eval subs", mySubmissions.submissions);
    let validAnswersCount = 0;
    if (Array.isArray(mySubmissions.submissions)) {
      validAnswersCount = mySubmissions.submissions.reduce(
        (acc, submission) => acc + submission.correctQuestionsNumber,
        0
      );
    }
  };

  const getMySubmission = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:5000/api/submissions/my-history",
      headers: {
        Authorization: `Bearer ${token} `,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setMySubmissions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMySubmission();
  }, []);

  // Use subs from mySubmissions state and initialize it to an empty array
  const subs = mySubmissions.submissions || [];

  useEffect(() => {
    console.log("my submissions", mySubmissions.submissions);
    subs.map((sub) => {
      console.log(sub.submittedAt);
    });
  }, [mySubmissions]);

  return (
    <>
      <MDBFooter>
        <div className="row foot justify-content-center align-items-center">
          <h2>User's History Test</h2>
          <Accordion defaultActiveKey="0">
            {/* Use subs array directly */}
            {subs.map((sub, i) => (
              <Accordion.Item key={i} eventKey={i}>
                {/* <Link></Link>{" "} */}
                <Accordion.Header>test id : {sub.id}</Accordion.Header>
                <Accordion.Body>
                  Submitted at : {sub.submittedAt}
                </Accordion.Body>
                <Accordion.Body>
                  Number of correct questions :{" "}
                  {sub.correctQuestionsNumber + " "}
                  Out of : {sub.allExamQuestionsNumber}
                </Accordion.Body>
                <Accordion.Body>
                  <Link to={`/subDetails/${sub.id}`}>Show details</Link>
                </Accordion.Body>
              </Accordion.Item>
            ))}
            {subs.length === 0 && <h4>No submissions to show.</h4>}
          </Accordion>
        </div>
      </MDBFooter>
    </>
  );
};

export default HistoryFoot;
