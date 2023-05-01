import React, { useState, useEffect } from "react";
import "./myprofile.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import AlertError from "../../shared/alertError";

const MyProfile = () => {
  const [profile, setProfile] = useState();
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const [errors, setErrors] = useState([]);

  const getMyProfile = () => {
    axios
      .get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setProfile(resp.data);
        console.log(profile);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);

      });
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div className="profile-container col-5 mt-5">
      <h2>My Profile</h2>
      <AlertError errors={errors}></AlertError>
      <div className="profile-card">
        <p className="text">userName : {profile?.name}</p> {/* Add optional chaining */}
        <p className="text">E-mail : {profile?.email}</p> {/* Add optional chaining */}
        <p className="text">Status : {profile?.status}</p> {/* Add optional chaining */}
        {/* <p className="text">Password : {profile.password}</p> */}
      </div>
    </div>
  );
};

export default MyProfile;