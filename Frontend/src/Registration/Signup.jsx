import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupValidation from "./SignupValidation";
import axios from "axios";
import "./Registration.css";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    dateOfBirth: "",
    emailId: "",
    phoneNo: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    currentPage: "/signup",
    // resume: null,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  setValues.currentPage = "/signup";
  console.log(values);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/signup",
      data: values,
    })
      .then((res) => {
        // alert(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(SignupValidation(values));
    if (errors.name === "" && errors.emailId === "" && errors.password === "") {
      axios({
        method: "post",
        url: "http://localhost:3001/signup",
        data: values,
      })
        .then((res) => {
          // alert(res);
          console.log(res);
          if (res.data === "User already exists - Please login") {
            errors.emailId("User with details exists already");
            alert("User exists - Please login");
            navigate("/");
          } else {
            alert("You've been registered successfully, Please login");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const handleResumeAttachmentChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (
  //       file.type === "application/pdf" ||
  //       file.type === "application/msword" ||
  //       file.type ===
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
  //       file.size <= 100000000
  //     ) {
  //       setValues(file);
  //     } else {
  //       alert(
  //         "Invalid Resume. Please select a doc, docx, or pdf file not exceeding 100MB."
  //       );
  //     }
  //   }
  // };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-box p-3 rounded w-50">
        <h2 className="box-title">Register</h2>
        <form action="" onSubmit={handleSubmit}>
          <p>
            All the fields with (<span className="text-danger">*</span>) are
            mandatory to be filled{" "}
          </p>

          <div className="formlayout">
            <div className="leftpanel">
              <div className="mb-3">
                <label htmlFor="name">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name."
                  className="form-control rounded-0"
                  name="name"
                  id="name"
                  onChange={handleInput}
                  required
                />
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dob">
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  placeholder="Enter date of birth."
                  className="form-control rounded-0"
                  name="dateOfBirth"
                  id="dob"
                  onChange={handleInput}
                  required
                />
                {errors.dateOfBirth && (
                  <span className="text-danger">{errors.dateOfBirth}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="emailAddress">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email id."
                  className="form-control rounded-0"
                  name="emailId"
                  id="emailAddress"
                  onChange={handleInput}
                  required
                />
                {errors.emailId && (
                  <span className="text-danger">{errors.emailId}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phone">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number."
                  className="form-control rounded-0"
                  name="phoneNo"
                  id="phone"
                  onChange={handleInput}
                  required
                />
                {errors.phoneNo && (
                  <span className="text-danger">{errors.phoneNo}</span>
                )}
              </div>
            </div>
            <div className="rightpanel">
              <div className="mb-3">
                <label htmlFor="address">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter address."
                  className="form-control rounded-0"
                  name="address"
                  id="address"
                  onChange={handleInput}
                  required
                />
                {errors.address && (
                  <span className="text-danger">{errors.address}</span>
                )}
              </div>
              <div className="mb-3">
                <label>Gender</label>
                <div className="radio-options">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={handleInput}
                      required
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={handleInput}
                      required
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      onChange={handleInput}
                      required
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password."
                  className="form-control rounded-0"
                  name="password"
                  onChange={handleInput}
                  required
                />
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword">
                  Re-enter Password <span className="text-danger">*</span>
                </label>

                <input
                  type="password"
                  placeholder="Re-enter password."
                  className="form-control rounded-0"
                  name="confirmPassword"
                  onChange={handleInput}
                  required
                />
                {errors.confirmPassword && (
                  <span className="text-danger">{errors.confirmPassword}</span>
                )}
              </div>
            </div>
          </div>
          <div className="btn-center">
            <button
              type="submit"
              name="submit"
              className="btn btn-success rounded-0 btn-alignment btn-center"
            >
              <strong>Sign up</strong>
            </button>
          </div>

          {/* <div className="needhelp">
            <p>Remember me</p>
          </div> */}
          <br />
          <div>
            {" "}
            <p className="switch-btwn-pages">
              Already have an account? {"   "}
              <Link to="/" className="btn-link">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
