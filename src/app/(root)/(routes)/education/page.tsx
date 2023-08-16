"use client"
import { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import axios from "axios";
import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";



export default function EducationPage() {
    const router = useRouter();
    const [university, setUniversity] = useState('');
    const [course, setCourse] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [collegeInfo, setCollegeInfo] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleAddEducation = async () => {
        if (university.trim() !== '' && course.trim() !== '' && startYear && endYear && collegeInfo.trim() !== '') {
          const newEducation = {
            university,
            course,
            startYear,
            endYear,
            collegeInfo,
          };
    
          try {
            setLoading(true);
            const response = await axios.post("/api/users/education", newEducation);
            console.log("Education added:", response.data);
            toast.success("Education added successfully");
            router.push("/skill");
      
            // Reset form fields
            setUniversity('');
            setCourse('');
            setStartYear('');
            setEndYear('');
            setCollegeInfo('');
          } catch (error) {
            console.error("Error adding education:", error);
            toast.error("Error adding education");
          } finally {
            setLoading(false);

          }
        }
      };
    
  
    return (
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Add Education</h1>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            value={university}
            onChange={e => setUniversity(e.target.value)}
            placeholder='University Name'
            className='border p-2'
          />
          <input
            type='text'
            value={course}
            onChange={e => setCourse(e.target.value)}
            placeholder='Course'
            className='border p-2'
          />
          <input
            type='number'
            value={startYear}
            onChange={e => setStartYear(e.target.value)}
            placeholder='Start Year'
            className='border p-2'
          />
          <input
            type='number'
            value={endYear}
            onChange={e => setEndYear(e.target.value)}
            placeholder='End Year'
            className='border p-2'
          />
          <textarea
            value={collegeInfo}
            onChange={e => setCollegeInfo(e.target.value)}
            placeholder='About College'
            className='border p-2'
          />
          <button onClick={handleAddEducation}  disabled={loading} className='bg-blue-500 text-white p-2 rounded'>
            {loading ? "Adding..." : "Add Education"}
          </button>
        </div>
      </div>
    );
  }