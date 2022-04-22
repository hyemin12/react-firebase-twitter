import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import AppRouters from "components/AppRouters";
import "css/app.css";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggIn, setIsLoggIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인, 계정생성 버튼을 누르거나 로그인 여부 판별
      if (user) {
        setIsLoggIn(true);
        setUserObj({
          displayName: user.displayName,
          photoURL:
            user.photoURL ||
            "data:image/png;base64,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",
          uid: user.uid,
          updateProfile: (arg) => {
            user.updateProfile(arg);
          },
        });
      } else {
        setIsLoggIn(false);
      }
      setInit(true);
    });
  }, []);
  function refreshUser() {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (arg) => {
        user.updateProfile(arg);
      },
    });
  }
  return (
    <>
      {init ? (
        <AppRouters
          isLoggIn={isLoggIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Loading..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Clone Twitter</footer> */}
    </>
  );
}

export default App;
