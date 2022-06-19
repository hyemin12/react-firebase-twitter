import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

function AppRouter({ refreshUser, isLoggIn, userObj }) {
  console.log(isLoggIn);
  return (
    <div className="app-wrapper">
      {isLoggIn && <Navigation userObj={userObj} refreshUser={refreshUser} />}
      <Routes>
        {isLoggIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}
export default AppRouter;
