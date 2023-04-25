import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { removeAuthUser, getAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/login");
  };
  console.log(auth)
  return (
    <React.Fragment>
      <header>
        <nav className="nav">
          <a href="/" className="logo link">
            logo
          </a>

          <div className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>

          <div className="nav__link hide">
            {!auth && (
              <>
                <Link className="link" to={"/login"}>
                  login
                </Link>
                <Link className="link" to={"/register"}>
                  SignUP
                </Link>
              </>
            )}

            {auth&&auth.user.type==="admin"&&(
              <>
              <Link className="link" to={"/mngUsers"}>manage users</Link>
              <Link className="link" to={"/mngQuestions"}>manage questions</Link>
              
              </>
            )}
            {auth && (
              <a
                className="link"
                style={{ cursor: "pointer" }}
                onClick={Logout}
              >
                logout
              </a>
            )}
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};
export default NavBar;
