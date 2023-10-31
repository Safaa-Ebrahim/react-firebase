import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

// component
import { showToast } from "./../store/slices/toastSlice";

// font awesom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye ,faEyeSlash} from "@fortawesome/free-solid-svg-icons";

export default function Register({ setUser, auth, updateUserName }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const register = async (values, { resetForm }) => {
    const { userName, email, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, {
        displayName: userName,
      });
      // handle response data, e.g. show success message
      dispatch(showToast("Register submitted successfully!"));
      resetForm();
      navigate("/login", { replace: true });
    } catch (err) {
      // handle error, e.g. show error message
      // dispatch(showToast(`${err.message}`));
      dispatch(showToast("Email already exists / Registration failed. Please try again."));
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-8 col-lg-6">
          <h2 className="mb-4 fw-bold">Register Form</h2>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              userName: Yup.string()
                .required("UserName is required")
                .min(3, "UserName must be at least 3 characters")
                .max(10, "UserName must be less than 10 characters"),
              email: Yup.string()
                .required("Email is required")
                .required("Email is required")
                .matches(
                  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                  "Email must be a valid email address"
                )
                .test(
                  "email-username-length",
                  "Sorry, email username must be between 6 and 30 characters long",
                  function (value) {
                    const username = value.split("@")[0];
                    return (
                      username.split("@")[0].length >= 6 &&
                      username.length <= 30
                    );
                  }
                )
                .test("lowercase", "Email must be lowercase", function (value) {
                  return value.toLowerCase() === value;
                }),
              password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters long")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol from (@$!%*?&) ."
                ),
            })}
            onSubmit={register}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label className="mb-1" htmlFor="userName">
                    UserName
                  </label>
                  <Field
                    className="form-control input"
                    name="userName"
                    type="text"
                    placeholder="Please enter your userName"
                  />
                  {errors.userName && touched.userName ? (
                    <div className="text-danger">{errors.userName}</div>
                  ) : null}
                </div>
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
                <div className="d-flex align-items-end justify-content-end">
                  <button type="submit" className="btn bg-yellow text-white mt-3 py-2 w-100">
                    Register
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
