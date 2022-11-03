import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";
import { useAuth } from "../../hooks/use-auth";
import "./Contact.scss";

const Contact = ({ userEmail, addFriend, getEmailForAddFriends, getUser }) => {
  const [user, setUser] = useState([]);
  const { avatar, username } = user;
  const { id } = useAuth();
  const combinedId = id > user.id ? id + user.id : user.id + id;
  useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, userEmail));
      const client = data.docs.map((document) => document.data());
      const selectedUser = client[2];
      setUser(selectedUser);
    })();
  }, []);

  const handleSelect = async () => {
    try {
      const ref = await getDoc(doc(db, "chats", combinedId));
      if (!ref.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", id), {
          [`${combinedId}.data`]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.id), {
          [`${combinedId}.data`]: serverTimestamp(),
        });
      }
    } catch (e) {}
    getUser(user);
  };

  return (
    <div className={"contact"} onClick={handleSelect}>
      <div className={"userDescription"}>
        <img src={avatar} alt="" />
        <div>
          <h3>{username}</h3>
          {user.email && user.email.length >= 20 ? (
            <p>{user.email.substr(0, 20)}...</p>
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        {addFriend && (
          <div
            className={"addFriendsOffer"}
            onClick={() => getEmailForAddFriends(userEmail)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Contact;
