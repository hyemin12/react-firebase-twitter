import { useState } from "react";
import { authService } from "fbase";

function AuthForm({ setNewAccount, newAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  function handleOnchange(event) {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "userName") {
      setUserName(value);
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
    } catch (error) {
      setError(error.message);
    }
  };
  function toggleAccount() {
    setNewAccount(!newAccount);
  }
  function handleAlert() {
    alert("준비중인 서비스입니다.");
  }
  return (
    <form onSubmit={submitLogin}>
      {newAccount && (
        <input
          name="userName"
          type="text"
          placeholder="User Name"
          required
          value={userName}
          onChange={handleOnchange}
        />
      )}
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
        <span className="find-password-btn" onClick={handleAlert}>
          Find Password
        </span>
      </div>
    </form>
  );
}

export default AuthForm;
