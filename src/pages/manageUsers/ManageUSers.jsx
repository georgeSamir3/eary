import React, { useEffect, useState } from "react";
import UserCard from "../../components/userCard/UserCard";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import AlertError from "../../shared/alertError";
const ManageUSers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [status, setStatus] = useState("inactive");
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [errors, setErrors] = useState([]);

  const handleStatusChange = () => {
    if (status === "active") setStatus("inactive");
    if (status === "inactive") setStatus("active");
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/users-management/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setAllUsers(allUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors);

      });
  };

  const getAllUsers = () => {
    axios
      .get(`http://127.0.0.1:5000/api/users-management?status=${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllUsers(response.data.users);
        console.log(allUsers);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors);

      });
  };

  useEffect(() => {
    getAllUsers();
  }, [status]);

  // useEffect(() => {
  //   console.log("allUsers updated:", allUsers);
  // }, [allUsers]);

  return (
    <div>
      <ListGroup style={{ width: "60%", margin: "15px auto" }}>
        <div className="row">
          <Link to={"/mngUsers/add"} className="col-8">
            <Button className="mt-3 mb-3 " style={{ display: "inline" }}>
              Create user
            </Button>
          </Link>
          <AlertError errors={errors}></AlertError>
          <Button
            className="mt-3 mb-3 col-4"
            style={{ display: "inline" }}
            onClick={() => {
              handleStatusChange();
            }}
          >
            the {status} users
          </Button>
        </div>

        {allUsers?.map((user, i) => {
          return (
            <ListGroupItem key={i}>
              {/* <UserCard user={user}></UserCard> */}
              <Card>
                <Card.Header>{user.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{user.email}</Card.Title>
                  <Card.Text>{user.status + " " + user.phone}</Card.Text>
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: "bisque",
                      color: "navy",
                      width: "32%",
                      marginRight: "1%",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/mngUsers/" + user.id}
                    >
                      update user
                    </Link>
                  </Button>
                  <Link to={`subDetails/${user.id}`}>
                    <Button
                      variant="success"
                      style={{
                        backgroundColor: "lightgrey",
                        color: "navy",
                        width: "32%",
                        marginLeft: "1%",
                      }}
                    >
                      User's submission
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "red",
                      color: "navy",
                      width: "32%",
                      marginLeft: "1%",
                    }}
                    onClick={(e) => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete User
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

export default ManageUSers;
