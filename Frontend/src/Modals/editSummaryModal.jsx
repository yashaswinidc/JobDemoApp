import React, { useState } from "react";
import "../styles/editSummaryModal.css";

function EditSummaryModal({ onClose, onSave, initialSummary, profileData }) {
  const [summary, setSummary] = useState(initialSummary);

  const handleSave = () => {
    onSave(summary);
    onClose();
  };

  return (
    <div className="edit-summary-modal">
      <div className="container">
        <div className="modal-content">
          <h2>Edit Summary</h2>
          <br />
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter your new summary here"
          />
          <div className="button-container">
            <button className="action-buttons" onClick={handleSave}>
              Save
            </button>
            <button className="action-buttons" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSummaryModal;
