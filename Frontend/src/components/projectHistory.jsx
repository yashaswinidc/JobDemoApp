import React from "react";
import "../styles/projectHistory.css";

function ProjectHistory({ projectData }) {
  return (
    <div className="projectHistory">
      <div className="projectContainer">
        <div className="title-container">
          <h5 className="title">{projectData.project_name}</h5>{" "}
          <p className="header-content">
            <a href="#" className="links">
              <strong> ✎ </strong>
            </a>
          </p>
        </div>
        <p className="year">
          <strong>{projectData.project_year}</strong>
        </p>
        <p className="skills">{projectData.skills}</p>
        <p className="description">{projectData.job_description}</p>
      </div>
      <br />
    </div>
  );
}

export default ProjectHistory;
