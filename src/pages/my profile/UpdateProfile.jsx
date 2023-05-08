import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertError from "../../shared/alertError";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
    const navigate=useNavigate();
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  
  const updateProfile = (e) => {
    e.preventDefault(); 

    let data = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      // password: password,
    };
    if (password!=="") {
      data.password = password;
    }
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:5000/api/profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors)
      });
      navigate("/")
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setProfile(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      <h1>Update Profile</h1>
      <AlertError errors={errors}></AlertError>
      <Form onSubmit={updateProfile} className="text-center py-2">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="User Name"
            value={profile?.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Email"
            value={profile?.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="change password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="phone"
            value={profile?.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;
