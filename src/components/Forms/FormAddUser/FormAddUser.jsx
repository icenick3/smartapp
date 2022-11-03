import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../firebase";
import "./FormAddUser.scss";
import { useAuth } from "../../../hooks/use-auth";

const FormAddUser = ({
  getUserEmail,
  setActive,
  contacts,
  setActiveConfirm,
}) => {
  const { email } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [alert, setAlert] = useState();

  const onSubmit = (e) => {
    (async () => {
      const data = await getDocs(collection(db, "users"));
      const clients = await data.docs.map((doc) => ({ ...doc.data() }));
      const { emails } = clients[0];
      emails.map((elem) => {
        if (
          elem === e.email &&
          e.email !== email &&
          contacts.includes(elem) === false
        ) {
          setActiveConfirm(true);
          setActive(false);
          getUserEmail(elem);
          reset();
        } else if (emails.includes(e.email) === false) {
          setAlert("This user does not exist");
        } else if (e.email === email) {
          setAlert("Unable to add myself");
        } else if (contacts.includes(elem)) {
          setAlert("This contact is already in your contact list");
        }
      });
    })();
  };

  return (
    <div className={"formBoxAddUser"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder={"email"} {...register("email")} />
        <p>{alert}</p>
        <button>Add Contact</button>
      </form>
    </div>
  );
};

export default FormAddUser;
