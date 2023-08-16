"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";


export default function SkillsPage() {

  const router = useRouter();
  
  const [newSkill, setNewSkill] = useState<string>('');
  const [skillsToAdd, setSkillsToAdd] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkillsToAdd(prevSkills => [...prevSkills, newSkill]);
      setNewSkill('');
    }
  };

  const handleSubmitSkills = async () => {
    if (skillsToAdd.length === 0) {
      toast.error('Please add at least one skill.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/users/skill', {
         skillsToAdd,
      });
      console.log('Skills added:', response.data);
      toast.success("Education added successfully");
      router.push("/experience");
      
      setSkills(prevSkills => [...prevSkills, ...skillsToAdd]);
      setSkillsToAdd([]);
      toast.success('Skills added successfully!');
    } catch (error) {
      setLoading(false);
      toast.error('Failed to add skills. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Skills</h1>
      <div className='flex gap-4'>
        <input
          type='text'
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          placeholder='Enter a skill'
          className='border p-2 flex-1'
        />
        <button
          onClick={handleAddSkill}
          disabled={loading}
          className='bg-blue-500 text-white p-2 rounded'
        >
          Add Skill
        </button>
      </div>
      <ul className='mt-4'>
        {skillsToAdd.map((skill, index) => (
          <li key={index} className='border-b p-2'>
            {skill}
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmitSkills}
        disabled={loading || skillsToAdd.length === 0}
        className='bg-green-500 text-white p-2 rounded mt-4'
      >
        {loading ? 'Adding...' : 'Submit Skills'}
      </button>
      <ul className='mt-4'>
        {skills.map((skill, index) => (
          <li key={index} className='border-b p-2'>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
