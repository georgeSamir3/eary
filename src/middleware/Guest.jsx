// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import { getAuthUser } from "../helper/Storage";

// const Guest = () => {
//   const auth = getAuthUser();
//   return <>{!auth ? <Outlet /> : <Navigate to={"/"} />}</>;
// };

// export default Guest;

import React, { useEffect ,useState} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
import axios from "axios";
// import { myProfile } from "../helper/Storage";
const Guest = () => {
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const auth = getAuthUser();
  const token = auth && auth.tokens && auth.tokens.token; // Check if auth object and tokens property exist
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
        setIsLoading(false); // Set loading state to false when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set loading state to false if there was an error
      });
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  useEffect(() => {
    console.log("this is profile");
    console.log(profile && profile.status); // Add check for undefined profile
  }, [profile]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return <>{!auth||(auth&&profile.status==="inactive") ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Guest;
