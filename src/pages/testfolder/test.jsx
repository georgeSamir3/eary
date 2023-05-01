import React, { useEffect, useState } from "react";
import TestCard from "../../components/testCard/testCard";
import "./test.css";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import AlertError from "../../shared/alertError";

const Test = () => {
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [allQuestions, setAllQuestions] = useState([]);
  const [errors, setErrors] = useState([]);

  const getAllQuestions = () => {
    axios
      .get("http://localhost:5000/api/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("questions res",response)
        setAllQuestions(response.data.questions);
        console.log(allQuestions);
        console.log(response);
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
    console.log("all q",allQuestions.map((ques)=>ques.name));
  }, [allQuestions]);

  return (
    <>
      <div className="testContainer">
        <AlertError errors={errors}></AlertError>
        <div className="TestCon">
          <TestCard allQuestions={allQuestions}></TestCard>
        </div>
      </div>
    </>
  );
};
export default Test;
