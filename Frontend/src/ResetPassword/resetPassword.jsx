import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetPasswordValidation from "./ResetPasswordValidation";
import axios from "axios";
import "./resetPassword.css";

function ResetPassword() {
  const [values, setValues] = useState({
    emailId: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showOTPField, setShowOTPField] = useState(false);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePasswordModification = (event) => {
    event.preventDefault();
    setErrors(ResetPasswordValidation(values));

    if (errors.emailId === "" && errors.password === "") {
      // Show OTP field
      setShowOTPField(true);
    }
  };

  const handleOTPSubmit = (event) => {
    event.preventDefault();

    const hardcodedOTP = "1a2b3c";

    if (values.otp === hardcodedOTP) {
      axios
        .post("http://localhost:3001/resetPassword", values)
        .then((res) => {
          alert(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-box p-3 rounded w-25">
        <h2 className="box-title">Reset Password</h2>
        <form action="" onSubmit={handlePasswordModification}>
          <div className="mb-3">
            <label htmlFor="emailId">Email</label>
            <input
              type="email"
              placeholder="Enter email."
              className="form-control rounded-0"
              name="emailId"
              id="emailId"
              onChange={handleInput}
            />
            {errors.emailId && (
              <span className="text-danger">{errors.emailId}</span>
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
          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter confirm password."
              className="form-control rounded-0"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleInput}
            />
            {errors.confirmPassword && (
              <span className="text-danger">{errors.confirmPassword}</span>
            )}
          </div>
          {showOTPField ? (
            <div className="mb-3">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="form-control rounded-0"
                name="otp"
                id="otp"
                onChange={handleInput}
              />
            </div>
          ) : null}
          {showOTPField ? (
            <button
              className="btn btn-success w-100 rounded-0"
              onClick={handleOTPSubmit}
              type="button"
            >
              Submit
            </button>
          ) : (
            <button
              className="btn btn-success w-100 rounded-0"
              type="button"
              onClick={handlePasswordModification}
            >
              Get OTP
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
