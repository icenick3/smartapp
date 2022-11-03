import React from "react";

import { useAuth } from "../../hooks/use-auth";
import "./Message.scss";

const Message = ({ message }) => {
  const { id } = useAuth();

  return (
    <div className={"message"}>
      {id === message.senderId && (
        <div className={"sender"}>
          <p>
            {message.text}{" "}
            <p className={"pDate"}>
              {message.date.toDate().toDateString()}{" "}
              {message.date.toDate().toLocaleTimeString()}
            </p>
          </p>
        </div>
      )}
      {id !== message.senderId && (
        <div className={"recipient"}>
          <p>
            {message.text}{" "}
            <p className={"pDate"}>
              {message.date.toDate().toDateString()}{" "}
              {message.date.toDate().toLocaleTimeString()}
            </p>
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;
