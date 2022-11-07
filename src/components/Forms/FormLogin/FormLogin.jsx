import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {collection, getDocs} from "firebase/firestore";
import {useDispatch} from "react-redux";

import {setUser} from "../../../store/slices/userSlice";
import {db} from "../../../firebase";
import "./FormLogin.scss";

const FormLogin = ({setLoading}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [pass, setPass] = useState(localStorage.getItem("password"));
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        if (e !== undefined) {
            e.preventDefault();
        }
        const asyncLogin = async () => {
            const auth = getAuth();
            try {
                await signInWithEmailAndPassword(auth, email, pass).then(({user}) => {
                    dispatch(
                        setUser({
                            email: user.email,
                            id: user.uid,
                            token: user.refreshToken,
                        })
                    );
                });
                setLoading(true)
                localStorage.setItem("email", email);
                localStorage.setItem("password", pass);
                if (email) {
                    const data = await getDocs(collection(db, email));
                    const client = data.docs.map((doc) => doc.data());
                    const user = client[2];
                    if (user) {
                        if (user.username && user.about && user.email) {
                             navigate("/");
                        }
                    } else navigate("/user-details");
                }
            } catch (e) {
                if (e.code === "auth/user-not-found") {
                    setError("Email not found");
                } else if (e.code === "auth/wrong-password") {
                    setError("Invalid password");
                } else if (e.code === "auth/internal-error") {
                    setError("The password field is empty");
                }
            }
        };
        asyncLogin();
    };

    useEffect(() => {
        if (localStorage.getItem("email") !== '' && localStorage.getItem("password") !== '') {
            setLoading(true);
            onSubmit();
        }
    }, []);

    return (
        <div className={"formBoxLogin"}>
            <form onSubmit={onSubmit}>
                <h1>LOGIN</h1>
                <hr/>
                <input
                    className={"Email"}
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
                {error && <p className={"error"}>{error}</p>}
                <div className={"Link"}>
                    <p>
                        Not a member yet?<Link to={"/register"}>Register</Link>
                    </p>
                </div>
                <div className={"btn"}>
                    <button>Log in</button>
                </div>
            </form>
        </div>
    );
};

export default FormLogin;
