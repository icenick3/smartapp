import React from "react";
import { Navigate } from "react-router-dom";

import SettingsHeader from "../../components/Headers/SettingsHeader/SettingsHeader";
import SettingsForm from "../../components/Forms/SettingsForm/SettingsForm";
import { useAuth } from "../../hooks/use-auth";
import "./SettingsPage.scss";

const SettingsPage = () => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <div className={"settingsPage"}>
      <SettingsHeader />
      <SettingsForm />
    </div>
  ) : (
    <div>
      <Navigate to="/login" />
    </div>
  );
};

export default SettingsPage;
