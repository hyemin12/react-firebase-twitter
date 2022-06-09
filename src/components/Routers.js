import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

function AppRouters({ refreshUser, isLoggIn, userObj }) {
  return (
    <div className="app-wrapper">
      {isLoggIn && <Navigation userObj={userObj} refreshUser={refreshUser} />}
      <Routes>
        <Route path="/" element={<Home userObj={userObj} />}></Route>
        <Route
          path="/profile"
          element={<Profile userObj={userObj} refreshUser={refreshUser} />}
        ></Route>
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
export default AppRouters;
