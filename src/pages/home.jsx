import React, { Component, useEffect, useState } from "react";
import Hearing from "../components/hearingTest/hearing";
import HistoryFoot from "../components/historyFooter/historyFoot";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
const Home = () => {
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [mySubmissions, setMySubmissions] = useState([]);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:5000/api/submissions/my-history?page=1&size=10",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getAllSubmissions = () => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setMySubmissions(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(()=>{
    getAllSubmissions();
  },[])
  useEffect(()=>{
    console.log("getAll api",mySubmissions)
  },[mySubmissions])
  return (
    <React.Fragment>
      <Hearing></Hearing>
      <HistoryFoot></HistoryFoot>
    </React.Fragment>
  );
};
export default Home;
