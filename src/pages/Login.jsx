import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { provider } from "../firebase/firebase-config";
// font awesom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// component
import { showToast } from "./../store/slices/toastSlice";

export default function Login({ auth, setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const login = async (values, { resetForm }) => {
    const { email, password } = values;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // store token in the localStorage
      const token = user.user.accessToken;
      localStorage.setItem("TokenFirebase", token);
      // handle response data, e.g. show success message
      setIsLoggedIn(true);
      dispatch(showToast("Login successfully!"));
      resetForm();
      // navigate to home page
      navigate("/home", { replace: true });
    } catch (err) {
      // dispatch(showToast(`${err.message}`));
      dispatch(showToast("Email or Password not correct. Please try again."));
    }
  };
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // store token in the localStorage
        const token = result.user.accessToken;
        localStorage.setItem("TokenFirebase", token);
        // handle response data, e.g. show success message
        setIsLoggedIn(true);
        dispatch(showToast("Singin with google successfully!"));
        navigate("/home");

        // const name = result.user.displayName;
        // const email = result.user.email;
        // const profilePic = result.user.photoURL;
        // localStorage.setItem("nameGoogle", name);
        // localStorage.setItem("emailGoogle", email);
        // localStorage.setItem("profilePic", profilePic);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showToast("failed to Singin with google. Please try again."));
      });
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-8 col-lg-6">
          <h2 className="mb-4 fw-bold">Login Form</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required("Email is required")
                .email("Invalid email address"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={login}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label className="mb-1" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="form-control input"
                    name="email"
                    type="email"
                    placeholder="Please enter your email"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-danger">{errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="mb-1" htmlFor="password">
                    Password
                  </label>
                  <div className="position-relative">
                    <Field
                      className="form-control input"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Please enter your password"
                    />
                    <span
                      className="position-absolute top-50 end-0 btn eyeIcon"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </span>
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-danger">{errors.password}</div>
                  ) : null}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    type="submit"
                    className="btn bg-yellow text-white mt-3 py-2 w-100"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="gray-col d-flex align-items-center justify-content-center m-0 my-2 or">
            <span className="line flex-grow-1"></span>
            <span>or</span>
            <span className="line flex-grow-1"></span>
          </p>
          <div className="d-flex align-items-center justify-content-center ">
            <button
              className="login-with-google-btn w-100"
              onClick={handleGoogleSignIn}
              
            >
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
