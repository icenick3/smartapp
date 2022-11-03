import React from "react";

import FormAddUser from "../Forms/FormAddUser/FormAddUser";
import "./PopupAddUser.scss";

const PopupAddUser = ({
  active,
  setActive,
  getUserEmail,
  contacts,
  setActiveConfirm,
}) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}>
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <FormAddUser
          getUserEmail={getUserEmail}
          setActive={setActive}
          contacts={contacts}
          setActiveConfirm={setActiveConfirm}
        />
      </div>
    </div>
  );
};

export default PopupAddUser;
