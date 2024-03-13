import React from "react";
import { useUrlState } from "../router/store";
import Login from "./login.tsx";
import Register from "./register/register";
import ForgotPassword from "./forgot-password";

const AuthCard: React.FC = () => {
  const { url } = useUrlState();

  const authType = url.searchParams.get("mode");

  switch (authType) {
    case "register":
      return <Register />;
    case "forgot-password":
      return <ForgotPassword />;
    default:
      return <Login />;
  }
};

export default AuthCard;
