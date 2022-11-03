import React from "react";

import "./PopupConfirm.scss";

const PopupConfirm = ({ active, setActive }) => {
  setTimeout(() => {
    setActive(false);
  }, 1200);

  return (
    <div className={active ? "confirm active" : "confirm"}>
      <div
        className={active ? "confirm-content active" : "confirm-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Request has been sent</h1>
      </div>
    </div>
  );
};

export default PopupConfirm;
