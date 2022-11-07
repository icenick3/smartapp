import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import UserDetailsHeader from "../../components/Headers/UserDetailsHeader/UserDetailsHeader";
import FormUserDetails from "../../components/Forms/FormUserDetails/FormUserDetails";
import { useAuth } from "../../hooks/use-auth";
import Loader from "../../components/Loader/Loader";

const UserDetailsPage = () => {
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  return isAuth ? (
    <div>
      <UserDetailsHeader/>
      <FormUserDetails setLoading={setLoading} />
      {loading && <Loader loading={loading} />}
    </div>
  ) : (
    <div>
      <Navigate to="/login" />
    </div>
  );
};

export default UserDetailsPage;
