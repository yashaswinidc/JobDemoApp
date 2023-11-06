import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";
import BlankProfileImage from "../images/BlankProfileImage.jpg";
import WorkHistory from "./workHistory";
import EducationHistory from "./educationHistory";
import ProjectHistory from "./projectHistory";
import EditSummaryModal from "../Modals/editSummaryModal";

function Profile() {
  const user_id = localStorage.getItem("userId");
  console.log("User ID", user_id);

  const profileImageURL = BlankProfileImage;
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [newSummary, setNewSummary] = useState("");

  const handleSummaryEdit = () => {
    setIsEditingSummary(true);
    setNewSummary(profileData.summary);
  };

  const profile_id = profileData.profile_id;

  const handleSaveSummary = (newSummary) => {
    axios({
      method: "post",
      url: `http://localhost:3001/profile/${profile_id}`,
      data: newSummary,
    })
      .then((response) => {
        console.log("API response:", response.data);
        setProfileData((prevData) => ({
          ...prevData,
          summary: newSummary,
        }));
        setIsEditingSummary(false);
      })
      .catch((error) => {
        console.error("Failed to update summary:", error);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/profile/${user_id}`,
    }).then((response) => {
      const { userData, profileData, educationData, workData, projectData } =
        response.data;
      setUserData(userData);
      setProfileData(profileData);
      setEducationData(educationData);
      setWorkData(workData);
      setProjectData(projectData);
    });
  }, [user_id]);
  // const mockData = {
  //   userData: {
  //     username: "Yashaswini D C",
  //     phoneNo: "7357883939",
  //     email_id: "yashaswini@example.com",
  //     Address: "Banglore",
  //   },
  //   profileData: {
  //     resume_headline: "Experienced Web Developer",
  //     key_skills: ["React", "JavaScript", "CSS", "HTML"],
  //     summary:
  //       "Experienced web developer with a strong background in frontend technologies. Able to work in environment where I can utilize all my knowledge and contribute to team as individual.",
  //   },
  //   educationData: [
  //     {
  //       institution: "University A",
  //       degree: "Bachelor's in Computer Science",
  //       year: "2015",
  //     },
  //     {
  //       institution: "University B",
  //       degree: "Master's in Software Engineering",
  //       year: "2017",
  //     },
  //   ],
  //   workData: [
  //     {
  //       job_title: "Frontend Developer",
  //       company: "Tech Corp",
  //       year: "2018-2020",
  //     },
  //     {
  //       job_title: "Senior Web Developer",
  //       company: "Web Solutions Inc.",
  //       year: "2020-Present",
  //     },
  //   ],
  // };
  // const [userData, setUserData] = useState(mockData.userData);
  // const [profileData, setProfileData] = useState(mockData.profileData);
  // const [educationData, setEducationData] = useState(mockData.educationData);
  // const [workData, setWorkData] = useState(mockData.workData);

  return (
    <div className="profile-page">
      {/* Profile card  */}
      <div className="profile-page-card">
        <div className="leftpanel">
          <section className="profile-image">
            <img src={profileImageURL} alt="ProfileImage" />
          </section>
        </div>
        <div className="rightpanel">
          <div className="rightpanel-content">
            <section>
              <h1>{userData.username}</h1>
              {workData.job_title && workData.company ? (
                <strong>
                  <p>
                    {workData.job_title}
                    <br /> {workData.company}
                  </p>
                </strong>
              ) : (
                <div>
                  <p> </p>
                </div>
              )}
            </section>

            <p>☎ {userData.phoneNo}</p>
            <div className="basic-details">
              <p>✉ {userData.email_id}</p>
              <p>📍 {userData.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-other-details">
        <div className="left-cardview">
          {/* Quick Links section*/}
          <div className="quick-links-container">
            <h2> Quick Links</h2> <br />
            <a className="section-links" href="#resume-section">
              Resume
            </a>
            <br />
            <a className="section-links" href="#resume-headline-section">
              Resume headline
            </a>
            <br />
            <a className="section-links" href="#key-skills-section">
              Key skills
            </a>
            <br />
            <a className="section-links" href="#work-history-section">
              Work-History
            </a>
            <br />
            <a className="section-links" href="#education-section">
              Education
            </a>
            <br />
            <a className="section-links" href="#projects-section">
              Projects
            </a>
            <br />
            <a className="section-links" href="#profile-summary-section">
              Profile summary
            </a>
          </div>
        </div>
        <div className="right-cardview">
          {/* Resume container  */}
          <div id="resume-section" className="resume-container">
            <h2>Resume</h2>
            <p>
              Resume is the most important document recruiters look for.
              Recruiters generally do not look at profiles without resumes.
            </p>
            <div className="resume-content">
              <div className="attached-resume">yash.doc</div>
              <div className="function-link">
                <a href="#" className="links">
                  <strong> ⇩</strong>
                </a>
                <a href="#" className="links">
                  <strong>🗑️</strong>
                </a>
              </div>
            </div>
            <div className="drop-box">
              <div className="attachment-link">
                <input type="file" name="attach_resume" />
                <p>Supported Formats: doc, docx, rtf, pdf, up to 2 MB</p>
              </div>
            </div>
          </div>
          <br />
          {/* Resume headline */}
          <div id="resume-headline-section" className="resume-container">
            <div className="headline-header">
              <h2 className="header-content">Resume headline</h2>
              <p className="header-content">
                <a href="#" className="links">
                  <strong> ✎ </strong>
                </a>
              </p>
            </div>
            <br />
            {profileData && profileData.resume_headline ? (
              <div>
                <p>{profileData.resume_headline}</p>
              </div>
            ) : (
              <div>
                <p>No resume headline available.</p>
              </div>
            )}
          </div>
          <br />
          {/* Key skills */}
          <div id="key-skills-section" className="keyskills-container">
            <div className="keyskills-header">
              <h2 className="header-content">Key skills</h2>
              <p className="header-content">
                <a href="#" className="links">
                  <strong> ✎ </strong>
                </a>
              </p>
            </div>
            <br />
            <div className="key-skills">
              {profileData && profileData.key_skills ? (
                profileData.key_skills.split(",").map((skill, index) => (
                  <span key={index} className="key-skill-label">
                    {skill}
                  </span>
                ))
              ) : (
                <p>No key skills available.</p>
              )}
            </div>
          </div>
          <br />
          {/* Work History */}
          <div id="work-history-section" className="workhistory-container">
            <div className="workhistory-header">
              <h2 className="header-content">Work History</h2>
              <p className="header-content">
                <a href="#" className="history-link">
                  <strong> Add Employment</strong>
                </a>
              </p>
            </div>
            <br />
            <div className="work-history">
              {workData && workData.length > 0 ? (
                workData.map((workItem, index) => (
                  <WorkHistory key={index} workData={workItem} />
                ))
              ) : (
                <p>No work history available.</p>
              )}
            </div>
          </div>
          <br />
          {/* Education  */}
          <div id="education-section" className="education-container">
            <div className="education-header">
              <h2 className="header-content">Education </h2>
              <p className="header-content">
                <a href="#" className="history-link">
                  <strong> Add Education</strong>
                </a>
              </p>
            </div>
            <br />
            <div className="education-history">
              {educationData && educationData.length > 0 ? (
                educationData.map((education, index) => (
                  <EducationHistory key={index} educationData={education} />
                ))
              ) : (
                <p>No Education history available.</p>
              )}
            </div>
          </div>
          <br />
          {/* Projects  */}
          <div id="projects-section" className="projects-container">
            <div className="projects-header">
              <h2 className="header-content">Projects </h2>
              <p className="header-content">
                <a href="#" className="history-link">
                  <strong> Add Project </strong>
                </a>
              </p>
            </div>
            <br />
            <div className="projects-details">
              {projectData && projectData.length > 0 ? (
                projectData.map((ProjectItem, index) => (
                  <ProjectHistory key={index} projectData={ProjectItem} />
                ))
              ) : (
                <p>No Project details available.</p>
              )}
            </div>
          </div>
          <br />
          {/* Profile summary  */}
          <div
            id="profile-summary-section"
            className="profile-summary-container"
          >
            <div className="headline-header">
              <h2 className="header-content">Summary </h2>
              <p className="header-content">
                {/* <a href="#" className="links">
                  <i>
                    <strong> ✎ </strong>
                  </i>
                </a> */}
                <button className="edit-btn" onClick={handleSummaryEdit}>
                  ✎
                </button>
                {isEditingSummary && (
                  <EditSummaryModal
                    onClose={() => setIsEditingSummary(false)}
                    onSave={handleSaveSummary}
                    initialSummary={newSummary}
                    profileData={profileData}
                  />
                )}
              </p>
            </div>
            <br />
            {profileData && profileData.summary ? (
              <div>
                <p>{profileData.summary}</p>
              </div>
            ) : (
              <div>
                <p>No profile summary available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
