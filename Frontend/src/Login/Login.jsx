import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
import LoginValidation from "./LoginValidation";
import axios from "axios";
import "./Login.css";
// import { userState } from "../Utils/atoms";
// import { useUser } from "../userContext";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const [userId, setUserId] = useRecoilState(userState);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(LoginValidation(values));

    if (errors.email === "" && errors.password === "") {
      axios({
        method: "post",
        url: "http://localhost:3001/login",
        data: values,
      })
        .then((res) => {
          console.log(res);
          console.log("data:", values);
          if (res.data.status === "failed") {
            alert("Invalid Username/Password...");
          } else {
            // setUserId(res.data.user_id);
            localStorage.setItem("userId", res.data.user_id);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // const GetUserID = () => {
    //   axios({
    //     method: "get",
    //     url: "http://localhost:3001/login",
    //     data: values,
    //   })
    //     .then((res) => {
    //       if (res.data === "user id retrieved") {
    //         console.log(res);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
  };

  // console.log("User ID", userId);

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-box p-3 rounded w-25">
        <h2 className="box-title">Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email."
              className="form-control rounded-0"
              name="email"
              id="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password."
              className="form-control rounded-0"
              name="password"
              id="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <br />
          <button type="submit" className="btn btn-success w-100 rounded-0">
            <strong>Login</strong>
          </button>
          <br />
          <br />
          <div>
            <p className="switch-btwn-pages">
              <strong>Forgot Password? </strong>
              <Link to="resetPassword" className="btn-link">
                <strong className="switch-btwn-pages">Reset Password</strong>
              </Link>
            </p>
          </div>

          <br />

          <div className="needhelp">
            <p className="switch-btwn-pages">
              <strong>Don't have an account? </strong>
              <br />
              <Link to="signup" className="btn-link">
                <strong className="switch-btwn-pages">Create Account</strong>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
