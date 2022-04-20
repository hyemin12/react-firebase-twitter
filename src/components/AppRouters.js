import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

function AppRouters({ isLoggIn, userObj }) {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        {isLoggIn && <Navigation />}
        <Routes>
          {isLoggIn ? (
            <>
              <Route
                exact
                path="/"
                element={<Home userObj={userObj} />}
              ></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </>
          ) : (
            <>
              <Route exact path="/" element={<Auth />}></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default AppRouters;
