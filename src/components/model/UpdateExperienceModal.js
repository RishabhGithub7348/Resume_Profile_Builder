import { useState, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateExperienceModal = ({ isOpen, onClose }) => {
    const { experience, setExperience} = useContext(PostContext)
  const [editedExperience, setEditedExperience] = useState({
    company: experience?.company,
    startYear: experience?.startYear,
    endYear: experience?.endYear,
    role: experience?.role,
    positionType: experience?.positionType

  });

  const handleInputChange = (field, value) => {
    setEditedExperience(prevExperience => ({
      ...prevExperience,
      [field]: value
    }));
  };


  const handleSave = async () => {
    try{
        const { company, startYear, endYear, role, positionType } = editedExperience;
        
        const response = await axios.put("/api/users/experience", {
            company,
            startYear,
            endYear,
            role,
            positionType

        });
        console.log("Response from server:", response.data);
        setExperience(editedExperience);
        toast.success("Experience updated successfully!");
  
        onClose();
    }
    
    catch (error) {
        console.error("Error updating certification:", error);
    
    }
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "flex" : "hidden"} items-center justify-center bg-black bg-opacity-50 z-50`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Experience</h2>
        <input
          type="text"
          name="company"
          value={editedExperience?.company}
          onChange={e => handleInputChange("company", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Company"
        />
        <input
          type="number"
          name="startYear"
          value={editedExperience?.startYear}
          onChange={e => handleInputChange("startYear", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Start Year"
        />
        <input
          type="number"
          name="endYear"
          value={editedExperience?.endYear}
          onChange={e => handleInputChange("endYear", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="End Year"
        />
        <input
          type="text"
          name="role"
          value={editedExperience?.role}
          onChange={e => handleInputChange("role", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Role"
        />
        <input
          type="text"
          name="positionType"
          value={editedExperience?.positionType}
          onChange={e => handleInputChange("positionType", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Position Type"
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

export default UpdateExperienceModal;
