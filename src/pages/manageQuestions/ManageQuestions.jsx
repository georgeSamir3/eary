import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import AlertError from "../../shared/alertError";
const ManageQuestions = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [errors, setErrors] = useState([]);

  const deleteQuestions = (id) => {
    console.log("the fucking id" + id);
    axios
      .delete(`http://localhost:5000/api/questions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setAllQuestions(allQuestions.filter((user) => user.id !== id));
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
        setAllQuestions(response.data.questions);
        console.log(allQuestions);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllQuestions();
  }, []);
  useEffect(() => {
    console.log(allQuestions);
  }, [allQuestions]);

  return (
    <div>
      <ListGroup style={{ width: "60%", margin: "15px auto" }}>
        <Link to={"/mngQuestions/add"}>
          <Button className="mt-3 mb-3">Create Question</Button>
        </Link>
        <AlertError errors={errors}></AlertError>
        {allQuestions?.map((Question, i) => {
          console.log(Question.id)
          return (
            <ListGroupItem key={i}>
              <Card>
                <Card.Header>{Question.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{Question.question}</Card.Title>
                  <Card.Text>Status:{Question.status}</Card.Text>
                  <Link
                      style={{ textDecoration: "none" }}
                      to={"/mngQuestions/" + Question.id}
                    >
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: "bisque",
                      color: "navy",
                      width: "48%",
                      marginRight: "1%",
                    }}
                  >
                    {/* <Link
                      style={{ textDecoration: "none" }}
                      to={"/mngQuestions/" + Question.id}
                    > */}
                      update question
                    {/* </Link> */}
                  </Button>
                  </Link>
                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "red",
                      color: "navy",
                      width: "48%",
                      marginLeft: "1%",
                    }}
                    onClick={(e) => {
                      deleteQuestions(Question.id);
                    }}
                  >
                    Delete Question
                  </Button>
                </Card.Body>
              </Card>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default ManageQuestions;
