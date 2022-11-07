import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { setUser } from "../../../store/slices/userSlice";
import { db } from "../../../firebase";
import "./FormRegister.scss";

const FormRegister = ({ setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const asyncRegister = async () => {
      try {
        if (pass === confirmPass) {
          const auth = getAuth();
          await createUserWithEmailAndPassword(auth, email, pass).then(
            ({ user }) => {
              dispatch(
                setUser({
                  email: user.email,
                  id: user.uid,
                  token: user.refreshToken,
                })
              );
            }
          );
          setLoading(true)
          localStorage.setItem("email", email);
          localStorage.setItem("password", pass);
          await updateDoc(doc(db, "users", "emails"), {
            emails: arrayUnion(email),
          });
          await navigate("/user-details");
        } else if (pass !== confirmPass) {
          setError("Passwords are not the same");
        }
      } catch (e) {
        if (e.code === "auth/email-already-in-use") {
          setError("This email already in use");
        } else if (e.code === "auth/invalid-email") {
          setError("Invalid email");
        } else if (e.code === "auth/weak-password") {
          setError("Password should be at least 6 characters");
        } else if (e.code === "auth/internal-error") {
          setError("The password field is empty");
        }
      }
    };
    asyncRegister();
  };

  return (
    <div className={"formBoxRegister"}>
      <form onSubmit={onSubmit}>
        <h1>REGISTER</h1>
        <hr />
        <input
          className={"email"}
          type="text"
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={"password"}
          type="password"
          placeholder={"Password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <input
          className={"confirmPassword"}
          type="password"
          placeholder={"Confirm Password"}
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />
        {error && <p className={"error"}>{error}</p>}
        <div className={"Link"}>
          <p>
            Already a member?<Link to={"/login"}>Sign In</Link>
          </p>
        </div>
        <div className={"btn"}>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
