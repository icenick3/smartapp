import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  arrayUnion,
  arrayRemove,
  collection,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { useDispatch } from "react-redux";

import { db } from "../../firebase";
import "./Contacts.scss";
import addContact from "../../images/addContact.png";
import PopupAddUser from "../PopupAddUser/PopupAddUser";
import Contact from "../Contact/Contact";
import { useAuth } from "../../hooks/use-auth";
import PopupConfirm from "../PopupConfirm/PopupConfirm";
import { removeUser } from "../../store/slices/userSlice";

const Contacts = ({ getUser }) => {
  const [user, setUser] = useState({
    username: null,
    avatar: null,
    about: null,
    email: null,
  });
  const { username, avatar } = user;
  const { email } = useAuth();
  const [active, setActive] = useState();
  const [activeConfirm, setActiveConfirm] = useState();
  const [userEmail, setUserEmail] = useState();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [emailForAddFriends, setEmailForAddFriends] = useState(null);
  const [friendRequest, setPossibleContacts] = useState([]);
  const dispatch = useDispatch();

  const getUserEmail = (email) => {
    setUserEmail(email);
  };

  const getEmailForAddFriends = (email) => {
    setEmailForAddFriends(email);
  };
  useEffect(() => {
    if (emailForAddFriends) {
      (async () => {
        const data = await getDocs(collection(db, email));
        const client = data.docs.map((doc) => doc.data());
        const { friendRequest } = client[1];
        friendRequest.map((elem) => {
          if (elem === emailForAddFriends) {
            updateDoc(doc(db, email, "friendRequest"), {
              friendRequest: arrayRemove(emailForAddFriends),
            });
            updateDoc(doc(db, emailForAddFriends, "contacts"), {
              contacts: arrayUnion(email),
            });
          }
        });
        await updateDoc(doc(db, email, "contacts"), {
          contacts: arrayUnion(emailForAddFriends),
        });
      })();
    }
  }, [emailForAddFriends]);

  useEffect(() => {
    if (userEmail) {
      (async () => {
        await updateDoc(doc(db, userEmail, "friendRequest"), {
          friendRequest: arrayUnion(email),
        });
      })();
    }
  }, [userEmail]);

  useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, email));
      const client = data.docs.map((doc) => doc.data());
      const user = client[2];
      setUser(user);
    })();
  }, [userEmail]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, email, "contacts"), (snapshot) => {
      setFilteredContacts([...snapshot.data().contacts]);
      setContacts([...snapshot.data().contacts]);
    });

    const unsub2 = onSnapshot(doc(db, email, "friendRequest"), (doc) => {
      doc.exists() && setPossibleContacts(doc.data().friendRequest);
    });
    return () => {
      unsub();
      unsub2();
    };
  }, [userEmail]);
  return (
    <div className={"contactsBox"}>
      <div className={"userHead"}>
        <div className={"userInform"}>
          <img className={"userPhoto"} src={avatar} alt="" />
          <h4>{username}</h4>
          <img
            className={"addContact"}
            src={addContact}
            alt=""
            onClick={() => setActive(true)}
          />
        </div>
        <div></div>
      </div>
      <div className={"contacts"}>
        <div className={"possibleContacts"}>
          {friendRequest !== undefined && friendRequest.length !== 0 && (
            <h4>PossibleContacts</h4>
          )}
          {friendRequest &&
            friendRequest.map((userEmail, index) => (
              <Contact
                key={index}
                addFriend={"addFriend"}
                getEmailForAddFriends={getEmailForAddFriends}
                userEmail={userEmail}
                getUser={getUser}
              />
            ))}
        </div>
        <div className={"realContacts"}>
          <h4>Contacts</h4>
          {filteredContacts !== [] &&
            filteredContacts.map((userEmail, index) => (
              <Contact key={index} userEmail={userEmail} getUser={getUser} />
            ))}
        </div>
      </div>
      <div className={"mobileFooter"}>
        <Link to={"/settings"} id={"setting"} />
        <Link
          to={"/login"}
          id={"logOut"}
          onClick={() => dispatch(removeUser())}
        />
      </div>
      <PopupAddUser
        active={active}
        setActive={setActive}
        getUserEmail={getUserEmail}
        contacts={contacts}
        setActiveConfirm={setActiveConfirm}
      />
      <PopupConfirm active={activeConfirm} setActive={setActiveConfirm} />
    </div>
  );
};

export default Contacts;
