import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";
import AlertError from "../../shared/alertError";
import { useNavigate } from "react-router-dom";
const UpdateUser = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const auth = getAuthUser();
  const token = auth.tokens.token;

  const [errors, setErrors] = useState([]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = (e) => {
    e.preventDefault();
    console.log("usersss" + JSON.stringify(user));
    axios
      .put(
        `http://localhost:5000/api/users-management/${id}`,
        JSON.stringify(user),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(user);
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users-management/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setUser({
          ...user,
          name: resp.data.name,
          email: resp.data.email,
          phone: resp.data.phone,
          status: resp.data.status,
        });

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      <h1>Update User</h1>
      <AlertError errors={errors}></AlertError>
      <Form onSubmit={updateUser} className="text-center py-2">
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

        {/* <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group> */}

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
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
