"use client"
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";

export default function CertificationPage() {
    const router = useRouter();
    const [courseName, setCourseName] = useState('');
    const [organization, setOrganization] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleAddCertification = async () => {
        if (courseName.trim() !== '' && organization.trim() !== '' && startDate && endDate) {
          const newCertification = {
            courseName,
            organization,
            startDate,
            endDate,
          };
    
          try {
            setLoading(true);
            // Send the data to the backend using POST request
            const response = await axios.post("/api/users/certification", newCertification);
            console.log("Certification added:", response.data);
            toast.success("Certification added successfully");
            window.location.href = "/profile";
            
            // Reset form fields
            setCourseName('');
            setOrganization('');
            setStartDate('');
            setEndDate('');
          } catch (error) {
            console.error("Error adding certification:", error);
          } finally {
            setLoading(false);
            router.push("/profile");
          }
        }
      };
    
  
    return (
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Add Certification</h1>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
            placeholder='Course Name'
            className='border p-2'
          />
          <input
            type='text'
            value={organization}
            onChange={e => setOrganization(e.target.value)}
            placeholder='Organization'
            className='border p-2'
          />
          <input
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            placeholder='Start Date'
            className='border p-2'
          />
          <input
            type='date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            placeholder='End Date'
            className='border p-2'
          />
          <button onClick={handleAddCertification} disabled={loading} className='bg-blue-500 text-white p-2 rounded'>
            
            {loading ? "Adding..." : "Add Certification"}
          </button>
        </div>
      </div>
    );
  }