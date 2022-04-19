import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";

function App() {
  const [isLoggIn, setIsLoggIn] = useState(false);
  return (
    <HashRouter>
      <Routes>
        {isLoggIn ? (
          <>
            <Route exact path="/" element={<Home />}></Route>
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />}></Route>
          </>
        )}
      </Routes>
    </HashRouter>
  );
}

export default App;
