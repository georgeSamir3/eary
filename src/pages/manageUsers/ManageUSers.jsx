import React, { useEffect, useState } from "react";
import UserCard from "../../components/userCard/UserCard";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const ManageUSers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const auth = getAuthUser();
  const token = auth.tokens.token;

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
      });
  };

  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/api/users-management", {
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
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // useEffect(() => {
  //   console.log("allUsers updated:", allUsers);
  // }, [allUsers]);

  return (
    <div>
      <ListGroup style={{ width: "60%", margin: "15px auto" }}>
        <Link to={"/mngUsers/add"}><Button className="mt-3 mb-3">Create user</Button></Link>
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
                      width: "48%",
                      marginRight: "1%",
                    }}
                    
                  >
                    <Link style={{textDecoration:"none"}} to={"/mngUsers/"+user.id}>
                    update user
                    </Link>
                    
                  </Button>
                  {/* <Button
                    variant="success"
                    style={{
                      backgroundColor: "lightgrey",
                      color: "navy",
                      width: "32%",
                      marginLeft: "1%",
                    }}
                  >
                    Update User
                  </Button> */}
                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "red",
                      color: "navy",
                      width: "48%",
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
