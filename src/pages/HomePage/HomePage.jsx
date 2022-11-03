import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import ChatHeader from "../../components/Headers/ChatHeader/ChatHeader";
import "./HomePage.scss";
import Contacts from "../../components/Contacts/Contacts";
import Chat from "../../components/Chat/Chat";
import { useAuth } from "../../hooks/use-auth";

const HomePage = () => {
  const { isAuth } = useAuth();
  const [user, setUser] = useState(null);

  const closeChat = (value) => {
    setUser(value);
  };

  const getUser = (user) => {
    setUser(user);
  };
  return isAuth ? (
    <div className={"homePage"}>
      <ChatHeader />
      <div className={"main"}>
        <Contacts getUser={getUser} />
        <Chat user={user} closeChat={closeChat} />
      </div>
    </div>
  ) : (
    <div>
      <Navigate to="/login" />
    </div>
  );
};

export default HomePage;
