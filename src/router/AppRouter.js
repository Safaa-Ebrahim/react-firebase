import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { auth } from "../firebase/firebase-config";

// components
import LayoutWithNav from "../components/LayoutWithNav";

// pages
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");

  const updateUserName = (name) => {
    setUserName(name);
  };

  return (
    <Routes>
      <Route element={<LayoutWithNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login auth={auth} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route
          path="/register"
          element={
            <Register
              auth={auth}
              setUser={setUser}
              updateUserName={updateUserName}
            />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
