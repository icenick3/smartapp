import React, { useState } from "react";

import FormRegister from "../../components/Forms/FormRegister/FormRegister";
import "./RegisterPage.scss";
import LoginHeader from "../../components/Headers/LoginHeader/LoginHeader";
import Loader from "../../components/Loader/Loader";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className={"registerPage"}>
      <LoginHeader />
      <FormRegister setLoading={setLoading} />
      {loading && <Loader loading={loading} />}
    </div>
  );
};

export default RegisterPage;
