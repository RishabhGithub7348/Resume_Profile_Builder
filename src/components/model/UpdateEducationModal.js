"use client";
import { useState, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateEducationModal = ({ isOpen, onClose }) => {
  
  const { education, setEducation} = useContext(PostContext)

  const [editedEducation, setEditedEducation] = useState({
    university: education?.university,
    course: education?.course,
    startYear: education?.startYear,
    endYear: education?.endYear,
    collegeInfo: education?.collegeInfo
  });

  const handleInputChange = (field, value) => {
    setEditedEducation(prevEducation => ({
      ...prevEducation,
      [field]: value
    }));
  };



  const handleSave = async () => {
    try{
        const { university, course, startYear, endYear, collegeInfo } = editedEducation;
        const id = education._id;
        const response = await axios.put("/api/users/education", {
            university,
            course,
            startYear,
            endYear,
            collegeInfo
        });
        console.log("Response from server:", response.data);
        setEducation(editedEducation);
        toast.success("Education updated successfully!");
  
        onClose();
    }
    
    catch (error) {
        console.error("Error updating certification:", error);
    
    }
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "flex" : "hidden"}  items-center justify-center bg-black bg-opacity-50 z-50`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Education</h2>
        <input
          type="text"
            name="university"
          value={editedEducation?.university}
          onChange={e => handleInputChange("university", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="University Name"
        />
        <input
          type="text"
          name="course"
          value={editedEducation?.course}
          onChange={e => handleInputChange("course", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Course"
        />
        <input
          type="number"
          name="startYear"
          value={editedEducation?.startYear}
          onChange={e => handleInputChange("startYear", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Start Year"
        />
        <input
          type="number"
            name="endYear"
          value={editedEducation?.endYear}
          onChange={e => handleInputChange("endYear", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="End Year"
        />
        <textarea
        name="collegeInfo"
          value={editedEducation?.collegeInfo}
          onChange={e => handleInputChange("collegeInfo", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="College Info"
        />
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

export default UpdateEducationModal;
