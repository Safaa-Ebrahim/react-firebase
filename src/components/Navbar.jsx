import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink, Link } from "react-router-dom";

// font awesom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlock,
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

// component
import { showToast } from "../store/slices/toastSlice";

import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";

import logo from "./../assets/logo.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navToggleBtn = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token;
  useEffect(() => {
    token = localStorage.getItem("TokenFirebase");
    setIsLoggedIn(true);
    if (!token) {
      navigate("/login", { replace: true });
      setIsLoggedIn(false);
    } else {
      navigate("/", { replace: true });
      setIsLoggedIn(true);
    }
  }, [token]);

  const logout = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("Are you sure that you want to logout");
    if (result === true) {
      try {
        await signOut(auth);
        setIsLoggedIn(false);
        localStorage.removeItem("TokenFirebase");
        dispatch(showToast("Logout successfully!"));
        navigate("/login", { replace: true });
      } catch (error) {
        dispatch(showToast("fail to Logout. Please try again."));
      }
    } else {
      return;
    }
  };

  return (
    <header className="header sticky-lg-top bg-dark">
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            ref={navToggleBtn}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-5 text-white hover-color-yellow"
                  onClick={() => {
                    if (
                      navToggleBtn.current.getAttribute("aria-expanded") ===
                      "true"
                    ) {
                      navToggleBtn.current.click();
                    }
                  }}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link fs-5 text-white hover-color-yellow"
                  onClick={() => {
                    if (
                      navToggleBtn.current.getAttribute("aria-expanded") ===
                      "true"
                    ) {
                      navToggleBtn.current.click();
                    }
                  }}
                  aria-current="page"
                  to="/movies"
                >
                  Movies
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav">
              {!isLoggedIn ? (
                <>
                  <li>
                    <NavLink
                      className="nav-link fs-5 text-white hover-color-yellow"
                      onClick={() => {
                        if (
                          navToggleBtn.current.getAttribute("aria-expanded") ===
                          "true"
                        ) {
                          navToggleBtn.current.click();
                        }
                      }}
                      aria-current="page"
                      to="/register"
                    >
                      {" "}
                      <FontAwesomeIcon
                        className="fs-6 pe-1"
                        icon={faUserCircle}
                      />
                      Register{" "}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fs-5 text-white hover-color-yellow"
                      onClick={() => {
                        if (
                          navToggleBtn.current.getAttribute("aria-expanded") ===
                          "true"
                        ) {
                          navToggleBtn.current.click();
                        }
                      }}
                      aria-current="page"
                      to="/login"
                    >
                      <FontAwesomeIcon className="fs-6 pe-1" icon={faUnlock} />
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      className="nav-link fs-5 text-white hover-color-yellow"
                      onClick={() => {
                        if (
                          navToggleBtn.current.getAttribute("aria-expanded") ===
                          "true"
                        ) {
                          navToggleBtn.current.click();
                        }
                      }}
                      aria-current="page"
                      to="/profile"
                    >
                      {" "}
                      <FontAwesomeIcon
                        className="fs-6 pe-1"
                        icon={faUserCircle}
                      />
                      Profile{" "}
                    </NavLink>
                  </li>
                  <li>
                    <span
                      className="nav-link fs-5 text-danger btn text-start"
                      aria-current="page"
                      onClick={() => {
                        if (
                          navToggleBtn.current.getAttribute("aria-expanded") ===
                          "true"
                        ) {
                          navToggleBtn.current.click();
                        }
                        logout();
                      }}
                    >
                      Logout
                      <FontAwesomeIcon
                        className="fs-6 ps-2"
                        icon={faRightFromBracket}
                      />
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
