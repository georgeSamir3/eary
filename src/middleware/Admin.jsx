import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Guest = () => {
  const auth = getAuthUser();
  console.log("auth is :",auth)
  return <>{auth && auth.user.type === "admin" ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Guest;
