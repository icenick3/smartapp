import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../../images/logo.png";
import chatCloud from "../../../images/chatCloud.png";
import { removeUser } from "../../../store/slices/userSlice";
import logOutLogo from "../../../images/logOutLogo.png";
import "./SettingsHeader.scss";
import settings from "../../../images/settings.png";

const SettingsHeader = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={"settingsHeader"}>
        <div className={"logo"}>
          <img src={logo} alt="logo" />
          <h4>SmartChat</h4>
        </div>
        <div className={"links"}>
          <Link to={"/"}>
            <div className={"chatsLink"}>
              <span>Chats </span>
              <img src={chatCloud} alt="" />
            </div>
          </Link>
          <Link to={"/settings"}>
            <div id={"settingsLink"}>
              Settings
              <img src={settings} alt="" />
            </div>
          </Link>
          <Link to={"/login"} onClick={() => dispatch(removeUser())}>
            <div className={"logOutLink"}>
              <span>Log Out </span>
              <img src={logOutLogo} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
