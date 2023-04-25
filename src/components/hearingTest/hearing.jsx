import React from "react";
import { Link } from "react-router-dom";
import "./hearing.css";
import Accord from "../accordion/accordion";
const Hearing = () => {
  const usersReview = [
    {
      username: "yamish kumar",
      userRev:
        "this is the best hearing test i have ever seen , it really made me well aware of my condition and helped me with my hearing abililtyevaluation.",
    },
    {
      username: "tom cruise",
      userRev:
        "this is the best hearing test i have ever seen , it really made me well aware of my condition and helped me with my hearing abililtyevaluation.",
    },
    {
      username: "alexandra daddario",
      userRev:
        "this is the best hearing test i have ever seen , it really made me well aware of my condition and helped me with my hearing abililtyevaluation.",
    },
  ];
  return (
    <>
      <div
        className="HearingContainer"
        style={{ margin: "15px", marginTop: "35px" }}
      >
        <div className="toggle">
          <img src={require("../../assets/th1.jpg")} alt="" />
        </div>

        <div className="textContainers">
          <div className="row centered">
            <h2> Test your hearing now</h2>
            <p>
              with the latest and most advanced test and its all for
              <span> free</span> check it out now from the link below .
            </p>
            <hr></hr>
            <h3 style={{ marginBottom: "15px" }}>user's reviews :</h3>
            <Accord userRev={usersReview}></Accord>
            <Link to="/test" className="btn-bisque" style={{marginTop:"15px",width:"97%"}}>
              <h4>Take your test now</h4>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hearing;
