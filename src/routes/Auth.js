import { useState } from "react";
import AuthForm from "components/AuthForm";
import SocialSign from "components/SocialSign";
import "css/auth.css";

function Auth() {
  const [newAccount, setNewAccount] = useState(true);

  return (
    <div className="auth-form">
      <h1 className="logo">Twitter</h1>
      <AuthForm setNewAccount={setNewAccount} newAccount={newAccount} />
      <SocialSign newAccount={newAccount} />
    </div>
  );
}

export default Auth;
