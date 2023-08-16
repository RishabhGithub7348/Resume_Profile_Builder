"use client"
import { useState } from "react";

const EducationModal = ({ isOpen, onClose, education, onSave }) => {
  const [editedEducation, setEditedEducation] = useState(education);

  const handleInputChange = (field, value) => {
    setEditedEducation(prevEducation => ({
      ...prevEducation,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(editedEducation);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "flex" : "hidden"} items-center justify-center bg-black bg-opacity-50`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Education</h2>
        <input
          type="text"
          value={editedEducation.university}
          onChange={e => handleInputChange("university", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="University Name"
        />
        {/* Other input fields for course, startYear, endYear, collegeInfo */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
