import { useState , useContext} from "react";
import { PostContext } from "../../context/PostContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateCertificationModal = ({ isOpen, onClose}) => {

    const { certification, setCertification} = useContext(PostContext)

    const [editedCertification, setEditedCertification] = useState({
        courseName: certification?.courseName,
        organization: certification?.organization,     
      });
    // console.log(editedCertification);

    const handleInputChange = (field, value) => {
        setEditedCertification((prevCertification) => ({
          ...prevCertification,
          [field]: value,
        }));
      };

     const handleSave = async () => {
    try {
        const { courseName, organization, startDate, endDate } = editedCertification;
        const response = await axios.put("/api/users/certification", {
            courseName,
            organization,
          });

      // Call the onSave function passed from parent component
      console.log("Response from server:", response.data);
      setCertification(editedCertification)
      toast.success("Certification updated successfully!");

      onClose();
    } catch (error) {
      // Handle error, show an error toast
      console.error("Error updating certification:", error);
      // You can add error handling logic here if needed
    }
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "flex" : "hidden"} items-center justify-center bg-black bg-opacity-50 z-50`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Certification</h2>
        <input
          type="text"
          name="courseName"
          value={editedCertification?.courseName}
          onChange={e => handleInputChange("courseName", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Course Name"
        />
        <input
          type="text"
            name="organization"
          value={editedCertification?.organization}
          onChange={e => handleInputChange("organization", e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Organization"
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

export default UpdateCertificationModal;
