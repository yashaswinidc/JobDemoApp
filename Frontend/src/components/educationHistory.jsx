import React from "react";
import "../styles/educationHistory.css";

function EducationHistory({ educationData }) {
  return (
    <div>
      <div className="educationHistory">
        <div className="title-container">
          <h5 className="title">{educationData.degree}</h5>{" "}
          <p className="header-content">
            <a href="#" className="links">
              <strong> ✎ </strong>
            </a>
          </p>
        </div>
        <h6 className="institution">{educationData.school}</h6>
        <p className="year-grade">
          <strong>
            {educationData.graduation_year} | {educationData.grade}
          </strong>
        </p>
        <p className="description">{educationData.additional_details}</p>
      </div>
      <br />
    </div>
  );
}

export default EducationHistory;
