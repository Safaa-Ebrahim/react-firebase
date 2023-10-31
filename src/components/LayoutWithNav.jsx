import React from "react";
import { Outlet } from "react-router-dom";

// component
import Navbar from "./Navbar";

const LayoutWithNav = ({isLoggedIn,setIsLoggedIn}) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <div className="container my-5">
        <Outlet />
      </div>
    </>
  );
};

export default LayoutWithNav;
