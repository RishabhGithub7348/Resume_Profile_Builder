"use client"
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";

export default function ExperiencePage() {
    const router = useRouter();
    const [company, setCompany] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [role, setRole] = useState('');
    const [positionType, setPositionType] = useState('full-time'); // Default value
    const [loading, setLoading] = useState(false);
  
    const handleAddExperience = async () => {
        if (company.trim() !== '' && startYear && role.trim() !== '' && endYear && positionType.trim() !== '') {
          const newExperience = {
            company,
            startYear,
            endYear,
            role,
            positionType,
          };
    
          try {
            setLoading(true);
            const response = await axios.post('/api/users/experience', newExperience);
            console.log('Response:', response.data);
            toast.success('Experience added successfully');
            router.push('/certification');
            // Reset form fields
            setCompany('');
            setStartYear('');
            setEndYear('');
            setRole('');
            setPositionType('full-time');
          } catch (error) {
            console.error('Error adding experience:', error);
            toast.error('Error adding experience');
          } finally {
            setLoading(false);
          }

        }
      };
  
    return (
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Add Experience</h1>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder='Company Name'
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
          <input
            type='text'
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder='Role'
            className='border p-2'
          />
          <select
            value={positionType}
            onChange={e => setPositionType(e.target.value)}
            className='border p-2'
          >
            <option value='full-time'>Full-time</option>
            <option value='internship'>Internship</option>
          </select>
          <button onClick={handleAddExperience} disabled={loading} className='bg-blue-500 text-white p-2 rounded'>
            {loading ? 'Adding...' : 'Add Experience'}
          </button>
        </div>
      </div>
    );
  }