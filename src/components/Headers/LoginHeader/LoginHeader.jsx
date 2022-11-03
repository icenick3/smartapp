import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../images/logo.png";
import login from "../../../images/login.png";
import register from "../../../images/register.png";
import "./LoginHeader.scss";

const LoginHeader = () => {
  return (
    <div className={"LoginHeader"}>
      <div className={"logo"}>
        <img src={logo} alt="logo" />
        <h4>SmartChat</h4>
      </div>
      <div className={"registration"}>
        <Link to={"/login"}>
          <div className={"logIn"}>
            Log in <img src={login} alt="" />
          </div>
        </Link>
        <Link to={"/register"}>
          <div className={"register"}>
            Register <img src={register} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;
