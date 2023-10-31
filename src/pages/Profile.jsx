import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { Spinner } from "react-bootstrap";
import profilePic from "./../assets/user.jpg";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const tokenRef = useRef(null);

  useEffect(() => {
    tokenRef.current = localStorage.getItem("TokenFirebase");
    if (tokenRef.current) {
      const decodedToken = jwtDecode(tokenRef.current);
      setUserInfo(decodedToken);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (!userInfo) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100vh">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <img
        src={userInfo?.picture ? userInfo.picture : profilePic}
        alt="profile from google"
        className="rounded mb-2"
        style={{ width: "100px", height: "100px" }}
      />
      <h2 className="mb-4 fw-bold ">UserName:</h2>
      <h2>{userInfo?.name}</h2>
      <h2 className="mb-4 fw-bold mt-2">Email:</h2>
      <h2>{userInfo?.email}</h2>
    </div>
  );
};

export default Profile;
