import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { arrayUnion, doc, updateDoc, Timestamp } from "firebase/firestore";

import { db } from "../../../firebase";
import { useAuth } from "../../../hooks/use-auth";
import "./FormToSendMessage.scss";

const FormToSendMessage = ({ user }) => {
  const { handleSubmit, register, reset } = useForm();
  const [text, setText] = useState();
  const { id } = useAuth();
  const combinedId = id > user.id ? id + user.id : user.id + id;

  const onSubmit = async () => {
    reset();
    if (text) {
      await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayUnion({
          id: user.id,
          text,
          senderId: id,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", user.id), {
        [`${combinedId}.lastMessage`]: text,
      });
    }
    setText(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={"formSendMessage"}>
        <input
          type="text"
          {...register("message")}
          placeholder={"Tap your message"}
          onChange={(e) => setText(e.target.value)}
        />
        <button></button>
      </form>
    </div>
  );
};

export default FormToSendMessage;
