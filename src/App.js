import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import Routers from "components/Routers";
import "css/app.css";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggIn, setIsLoggIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인, 계정생성 버튼을 누르거나 로그인 여부 판별
      if (user) {
        setIsLoggIn(true);
      } else {
        setIsLoggIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <Routers isLoggIn={isLoggIn} /> : "Loading..."}
      <footer>&copy; {new Date().getFullYear()} Clone Twitter</footer>
    </>
  );
}

export default App;
