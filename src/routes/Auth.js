import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "css/auth.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  function handleOnchange(event) {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  const submitLogin = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 계정 생성
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  function toggleAccount() {
    setNewAccount(!newAccount);
  }
  const onSocialogin = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div className="auth-form">
      <h1 className="logo">
        <FontAwesomeIcon icon={faTwitter} className="twitter-logo" />
        Twitter
      </h1>
      <form onSubmit={submitLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleOnchange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleOnchange}
        />
        <input
          type="submit"
          className="twitter"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error}
        <div className="auth-btn">
          <span onClick={toggleAccount}>
            {newAccount ? "Log In" : "Create Account"}
          </span>
          <span className="find-password-btn">Find Password</span>
        </div>
      </form>
      <div className="btn-group">
        <h4>{newAccount ? "Create Account" : "Login"} with social account</h4>
        <button name="google" onClick={onSocialogin}>
          <FontAwesomeIcon icon={faGoogle} size="2x" className="google-logo" />

          <p>Continue With Google</p>
        </button>
        <button name="github" onClick={onSocialogin}>
          <FontAwesomeIcon icon={faGithub} size="2x" />
          <p>Continue With Github</p>
        </button>
      </div>
    </div>
  );
}

export default Auth;
