import React, { useEffect, useState } from "react";
import { authService } from "fbase";
// import Auth from "routes/Auth";
import AppRouter from "components/Routers";
import "css/app.css";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  console.log(userObj);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인, 계정생성 버튼을 누르거나 로그인 여부 판별
      if (user) {
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
        setUserObj(null);
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
        <AppRouter
          isLoggIn={Boolean(userObj)}
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
