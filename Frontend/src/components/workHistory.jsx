import React from "react";
import "../styles/workHistory.css";

function WorkHistory({ workData }) {
  return (
    <div className="workHistory">
      <div className="workDataContainer">
        <div className="title-container">
          <h5 className="title">{workData.job_title}</h5>{" "}
          <p className="header-content">
            <a href="#" className="links">
              <strong> ✎ </strong>
            </a>
          </p>
        </div>
        <h6 className="company">{workData.company}</h6>
        <p className="year">
          <strong>{workData.year}</strong>
        </p>
        <p className="skills">{workData.skills}</p>
        <p className="description">{workData.job_description}</p>
      </div>
      <br />
    </div>
  );
}

export default WorkHistory;
