import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../login/login.css";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

const SignUP = () => {
  const navigate = useNavigate();
  const checkUserAuthorized = () => {
    if (true) {
      navigate("/");
    }
  };

  const [register, setRegister] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
    err: [],
    loading: false,
  });

  const submitRegister = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:5000/api/auth/register", {
        email: register.email,
        password: register.password,
        name: register.username,
        phone: register.phone,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        setAuthUser(resp.data);
        checkUserAuthorized();
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: true,
          err: errors.response.data.errors,
        });
        console.log(errors.response.data.errors);
        console.log(register.err)
      });
  };

  return (
    <div className="login-container mt-5">
      <h1>Sign UP</h1>
      {register.err.map((error, i) => {
        <Alert key={i} variant="danger">
          {error.msg}
        </Alert>;
      })}

      <Form onSubmit={submitRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={register.username}
            onChange={(e) =>
              setRegister({ ...register, username: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNum">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter number"
            value={register.phone}
            onChange={(e) =>
              setRegister({ ...register, phone: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
        </Form.Group>

        <Button
          variant="light"
          type="submit"
          style={{ backgroundColor: "bisque" }}
          disabled={register.loading === true}
        >
          register
        </Button>
      </Form>
    </div>
  );
};

export default SignUP;
