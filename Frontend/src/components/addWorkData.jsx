import React, { useState } from "react";

function AddWorkData({ onAddWorkHistory }) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleAddWorkHistory = () => {
    if (!jobTitle || !company || !year || !skills || !jobDescription) {
      alert("Please fill out all fields");
      return;
    }

    const workHistory = {
      job_title: jobTitle,
      company,
      year,
      skills,
      job_description: jobDescription,
    };

    // Call the provided callback to add work history
    onAddWorkHistory(workHistory);

    setJobTitle("");
    setCompany("");
    setYear("");
    setSkills("");
    setJobDescription("");
  };

  return (
    <div className="addWorkData">
      <h2>Add Employment</h2>
      <div className="workDataContainer">
        <div className="title-container">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="title-container">
          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="title-container">
          <label>Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="title-container">
          <label>Skills:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="title-container">
          <label>Job Description:</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <button onClick={handleAddWorkHistory}>Add Work History</button>
      </div>
    </div>
  );
}

export default AddWorkData;
