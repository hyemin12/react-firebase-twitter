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
          displayName: user.displayName ?? "User Name",
          photoURL:
            user.photoURL ??
            "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
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
