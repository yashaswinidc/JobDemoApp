import React from "react";
import "../styles/jobcard.css";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-top">
          <h4>{job.title}</h4>
          <h6>{job.company_name}</h6>
        </div>
      </div>
      <div className="job-card-body">
        <div className="icon">
          <div role="img" aria-label="Job Icon">
            💼 {job.experience}
          </div>
        </div>
        <div className="separator">|</div>
        <div className="icon">
          <div role="img" aria-label="Amount Icon">
            ₹ {job.salary} LPA
          </div>
        </div>
        <div className="separator">|</div>
        <div className="icon">
          <div role="img" aria-label="Location Icon">
            📍 {job.location}
          </div>
        </div>
      </div>
      <div
        className="skillset-description"
        // onClick={() => alert(job.description)}
      >
        <div className="text-file-icon">
          <span role="img" aria-label="Text File Icon">
            📄
          </span>
        </div>
        <div className="skillset-details">{job.description}</div>
      </div>
      <div className="key-skills">
        {job.skills.split(",").map((skill, index) => (
          <span key={index} className="key-skill-label">
            {skill}
          </span>
        ))}
      </div>
      <div className="applySection">
        <button type="submit"> Apply</button>
      </div>
    </div>
  );
}

export default JobCard;
