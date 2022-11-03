import React, { useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../../firebase";
import "./FormUserDetails.scss";
import { useAuth } from "../../../hooks/use-auth";

const FormUserDetails = ({ setLoading }) => {
  const { email, id } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [username, setUsername] = useState("Username");
  const [aboutMe, setAboutMe] = useState("About me");
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSubmit = async (data) => {
    if (!image) {
      setImageError("Upload a photo");
    }
    if (image !== null && data.username && data.aboutMe) {
      const imageRef = ref(
        storage,
        `images/${image.name + Math.floor(Math.random() * 10000)}`
      );
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      const username = data.username;
      if (!username) {
        return;
      }
      await setDoc(doc(db, email, "contacts"), {});
      await setDoc(doc(db, email, "friendRequest"), {});
      await setDoc(doc(db, email, "user"), {
        username: data.username,
        about: data.aboutMe,
        avatar: imageUrl,
        email,
        id,
      });
      await setDoc(doc(db, "userChats", id), {});
      navigate("/");
    }
  };

  const onClick = () => {
    if (image !== null && username && aboutMe) {
      setLoading(true);
    }
  };
  return (
    <div className={"formBoxUserDetails"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>DETAILS</h1>
        <hr />
        <input
          type="text"
          placeholder={"Username"}
          {...register("username")}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={"About me"}
          {...register("aboutMe")}
          onChange={(e) => setAboutMe(e.target.value)}
          required
        />

        <label className="custom-file-upload">
          ADD AVATAR
          <input
            type="file"
            accept="image/*,.pdf,.jpg"
            {...register("picture")}
            onChange={(e) => {
              setImage(e.target.files[0]);
              setImageError(null);
            }}
          />
        </label>
        {imageError && <p className={"error"}>{imageError}</p>}
        <div id="login-container">
          <div
            className="profile-img"
            style={{ backgroundImage: `url(${preview})` }}
          >
            {!preview && <h4>Photo</h4>}
          </div>
          <div className={"userInfo"}>
            <h1>{username}</h1>
            <div className="description">{aboutMe}</div>
          </div>
        </div>
        <button onClick={() => onClick()}>Create user</button>
      </form>
    </div>
  );
};

export default FormUserDetails;
