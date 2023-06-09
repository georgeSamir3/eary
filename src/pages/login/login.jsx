import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./login.css";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
import AlertError from "../../shared/alertError";

const Login = () => {
  const navigate = useNavigate();
  const checkUserAuthorized = () => {
    if (true) {
      navigate("/");
    }
  };
  const [login, setLogin] = useState({
    email: "",
    password: "",
    err: [],
    loading: false,
  });

  const submitLogin = (e) => {
    e.preventDefault();
    setLogin({ ...login, err: [] });
    axios
      .post("http://localhost:5000/api/auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        checkUserAuthorized();
      })
      .catch((errors) => {
        console.log("errr", errors);
        setLogin({ ...login, err: errors.response.data.errors });
      });
  };
  useEffect(() => {
    console.log("the errors",login.err);
  }, [login.err]);
  if (!login) return <div></div>;
  console.log(login);
  return (
    <div className="login-container mt-5">
      <h1>Login form</h1>
      {/* {login.err.map((error, i) => {
        return(
        <Alert key={i} variant="danger">
          {console.log("error from alert",error)}
          {error}
        </Alert>);
      })} */}
      <AlertError errors={login.err}></AlertError>
      <Form onSubmit={submitLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
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
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>

        <Button
          variant="light"
          type="submit"
          style={{ backgroundColor: "bisque" }}
          disabled={login.loading === true}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
