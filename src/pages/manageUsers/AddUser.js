import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import AlertError from "../../shared/alertError";
const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    status: "",
    // type:"user",
  });
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuthUser();
  const token = auth.tokens.token;

  const [errors, setErrors] = useState([]);

  const addUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/users-management",JSON.stringify(user),{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
      setErrors(err.response.data.errors);

    });
    console.log(user)
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      <h1>Add User</h1>
      <AlertError errors={errors}></AlertError>
      <Form onSubmit={addUser} className="text-center py-2">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="User Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="status active or inactive"
            value={user.status}
            onChange={(e) => setUser({ ...user, status: e.target.value })}
          />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
