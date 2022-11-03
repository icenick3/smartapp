import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./ChatHeader.scss";
import { removeUser } from "../../../store/slices/userSlice";
import logOutLogo from "../../../images/logOutLogo.png";
import settings from "../../../images/settings.png";
import logo from "../../../images/logo.png";
import chatCloud from "../../../images/chatCloud.png";

const ChatHeader = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={"chatHeader"}>
        <div className={"logo"}>
          <img src={logo} alt="logo" />
          <h4>SmartChat</h4>
        </div>
        <div className={"links"}>
          <Link to={"/"}>
            <div className={"chatsLink"}>
              Chats
              <img src={chatCloud} alt="" />
            </div>
          </Link>
          <Link to={"/settings"}>
            <div className={"settingsLink"}>
              Settings
              <img src={settings} alt="" />
            </div>
          </Link>
          <Link to={"/login"} onClick={() => dispatch(removeUser())}>
            <div className={"logOutLink"}>
              Log Out <img src={logOutLogo} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
