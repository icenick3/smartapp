import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../../images/logo.png";
import "./UserDetailsHeader.scss";
import logOutLogo from "../../../images/logOutLogo.png";
import { removeUser } from "../../../store/slices/userSlice";

const UserDetailsHeader = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={"userDetailsHeader"}>
        <div className={"logo"}>
          <img src={logo} alt="logo" />
          <h4>SmartChat</h4>
        </div>
        <div className={"links"}>
          <Link
            className={"linkLogOut"}
            to={"/login"}
            onClick={() => dispatch(removeUser())}
          >
            <div className={"logOutLink"}>
              <span>Log Out</span>
              <img src={logOutLogo} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsHeader;
