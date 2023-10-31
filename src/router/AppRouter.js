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
import Movies from "../pages/Movies";
import Profile from "../pages/Profile";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({});
  
  return (
    <Routes>
      <Route
        element={
          <LayoutWithNav
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route
          path="/login"
          element={<Login auth={auth} setIsLoggedIn={setIsLoggedIn} />}
          setUser={setUser}
        />
        <Route
          path="/register"
          element={
            <Register
              auth={auth}
              setUser={setUser}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
