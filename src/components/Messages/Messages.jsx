import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { useAuth } from "../../hooks/use-auth";
import { db } from "../../firebase";
import Message from "../Message/Message";
import "./Messages.scss";

const Messages = ({ user, getMessage }) => {
  const [messages, setMessages] = useState([]);
  const { id } = useAuth();
  const combinedId = id > user.id ? id + user.id : user.id + id;

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      doc.exists() && setMessages(doc.data());
      getMessage(doc.data());
    });
    return () => {
      unSub();
    };
  }, [combinedId]);

  return (
    <div className={"messages"}>
      {messages.messages &&
        messages.messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
    </div>
  );
};

export default Messages;
