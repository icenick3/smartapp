import React, { useState } from "react";

import "./LoginPage.scss";
import FormLogin from "../../components/Forms/FormLogin/FormLogin";
import LoginHeader from "../../components/Headers/LoginHeader/LoginHeader";
import Loader from "../../components/Loader/Loader";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className={"loginPage"}>
        <LoginHeader />
        <FormLogin setLoading={setLoading} />
      </div>
      {loading && <Loader loading={loading} />}
    </div>
  );
};

export default LoginPage;
