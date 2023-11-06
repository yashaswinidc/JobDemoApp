import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./jobcard";
import profileImageURL from "../images/BlankProfileImage.jpg";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../userContext";

function Home() {
  const [jobListings, setJobListings] = useState([]);
  const navigate = useNavigate();
  // const { userId } = useUser();

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        setJobListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="homepage">
      {/* Contents : Left */}
      <div className="left-container">
        <div className="profile-section">
          <section className="profileimage">
            <img src={profileImageURL} alt="ProfileImage" />
          </section>
          <section>
            <h1>Yashaswini</h1>

            <p>
              Junior developer @
              <br /> Tebs
            </p>
            <button
              className="home-page-button"
              type="button"
              onClick={handleEditProfileClick}
            >
              Edit profile
            </button>
          </section>
        </div>
        <div className="quick-links-container">
          <a className="quick-links" href="/dashboard">
            <strong>🏠 Home</strong>
          </a>
          <a className="quick-links" href="/applies">
            <strong>💼 Job applies</strong>
          </a>
          <a className="quick-links" href="/inbox">
            <strong> 📥 Inbox</strong>
          </a>
          <a className="quick-links" href="/">
            <strong> ↪️ Logout</strong>
          </a>
        </div>
      </div>

      {/* Contents: Right */}
      <div className="right-container">
        <div className="jobs-list">
          <h1>Recommended jobs for you</h1>
          <div className="job-card-container">
            {jobListings.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
