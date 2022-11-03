import React, { useEffect, useRef, useState } from "react";

import FormToSendMessage from "../Forms/FormToSendMessage/FormToSendMessage";
import Messages from "../Messages/Messages";
import "./Chat.scss";
import close from "../../images/closeChat.png";

const Chat = ({ user, closeChat }) => {
  const [message, setMessage] = useState();
  const [ref, setRef] = useState(undefined);
  const chatRef = useRef();

  const getMessage = (messageFromUser) => {
    setMessage(messageFromUser);
  };

  useEffect(() => {
    setRef(chatRef.current);
    if (ref) {
      ref.scrollTop = ref.scrollHeight;
    }
  }, [user, message]);

  return user ? (
    <div className={"chatBox"}>
      <div className={"contactInfo"}>
        <img className={"userAvatar"} src={user.avatar} alt="" />
        <h4>{user.username}</h4>
        <img
          className={"closeChat"}
          src={close}
          alt=""
          onClick={() => {
            closeChat(undefined);
          }}
        />
      </div>
      <div className={"chat"} ref={chatRef}>
        <Messages user={user} getMessage={getMessage} />
      </div>
      <div className={"addMessage"}>
        <FormToSendMessage user={user} />
      </div>
    </div>
  ) : (
    <div className={"noChat"}>
      <h1>Please, Select a Chat</h1>
    </div>
  );
};

export default Chat;
