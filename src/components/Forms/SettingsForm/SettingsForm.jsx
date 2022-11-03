import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import { useAuth } from "../../../hooks/use-auth";
import { db, storage } from "../../../firebase";
import "./SettingsForm.scss";

const SettingsForm = () => {
  const [user, setUser] = useState();
  const [image, setImage] = useState(null);
  const { email } = useAuth();
  const { register, handleSubmit } = useForm();
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

  useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, email));
      const client = await data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const user = client[2];
      setUser(user);
    })();
  }, []);

  const onSubmit = async () => {
    if (user.username && user.about) {
      if (image) {
        const imageRef = ref(
          storage,
          `images/${image.name + Math.floor(Math.random() * 10000)}`
        );
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        const userDoc = doc(db, email, user.id);
        await updateDoc(userDoc, {
          username: user.username,
          avatar: imageUrl,
        });
      } else {
        const userDoc = doc(db, email, user.id);
        await updateDoc(userDoc, {
          username: user.username,
        });
      }
    }
  };

  const deleteImage = async () => {
    if (user.avatar !== "") {
      const imageRef = await ref(storage, user.avatar);
      await deleteObject(imageRef);
      const userDoc = doc(db, email, user.id);
      await updateDoc(userDoc, {
        avatar: "",
      });
      setUser({ ...user, avatar: "" });
    } else setImage(null);
  };
  return (
    <div className={"formBoxSettings"}>
      {!!user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>SETTINGS</h1>
          <hr />
          {user.avatar !== "" && !image && (
            <div
              className="profile-img"
              style={{ backgroundImage: `url(${user.avatar})` }}
              onClick={deleteImage}
            >
              <p>Delete</p>
            </div>
          )}
          {user.avatar === "" && image && (
            <div
              className="profile-img"
              style={{ backgroundImage: `url(${preview})` }}
              onClick={deleteImage}
            >
              <p>Delete</p>
            </div>
          )}
          {user.avatar === "" && !image && (
            <label className="custom-file-upload">
              <p>ADD AVATAR</p>
              <input
                type="file"
                accept="image/*,.pdf,.jpg"
                {...register("picture")}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          )}
          <input
            type="text"
            value={user.username}
            {...register("username")}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <button>Change</button>
        </form>
      )}
    </div>
  );
};

export default SettingsForm;
