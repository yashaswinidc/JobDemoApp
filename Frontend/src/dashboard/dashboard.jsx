import React, { useState } from "react";
import "./dashboard.css";
import logo from "../images/Jobography_Logo.png";
import { Link } from "react-router-dom";

function Dashboard() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const user_id = localStorage.getItem("userId");
  // console.log("User ID", user_id);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="pageContent">
      <section className="topnav">
        <div className="topnavwrapper bg-white">
          <div className="wrapperleft">
            <div className="logowrapper">
              <img src={logo} alt="Jobography icon" className="logoimg" />
            </div>
            <div className="searchwrapper">
              <input type="text" placeholder="Search jobs here..." />
              <i className="" />
            </div>
          </div>
          <div className="wrapperright">
            <nav className="dashboard-nav">
              <ul className="innernavitemsright">
                <li>
                  <Link to="/dashboard" className="link-pages">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/applies" className="link-pages">
                    Applies
                  </Link>
                </li>
                <li>
                  <Link to="/inbox" className="link-pages">
                    Inbox
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="link-pages">
                    Profile
                  </Link>
                </li>
                <li className={`menu-card ${isDropdownOpen ? "open" : ""}`}>
                  <button onClick={toggleDropdown} className="dropbtn">
                    ☰
                  </button>
                  <div className="menu-card-content">
                    <a href="/settings">Settings</a>
                    <a href="/faqs">FAQ's</a>
                    <a href="/">Logout</a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
