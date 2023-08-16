"use client"
import { use, useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import About from "@/components/About"
import  axios from 'axios';
import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";
import router from "next/navigation"




const AboutPage =  () =>  {
     const router = useRouter();
     
    const [about, setAbout] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [id, setId] = useState('');

  
    // useEffect(() => {
    //   const fetchUser = async () => {
    //     try {
    //       const response = await axios.get("/api/users/detail");
    //       console.log('Fetched User:', response.data.data);
    //       setUser(response.data.data);
    //       setId(response.data.data._id);
    //        router.refresh();
    //     } catch (error) {
    //       console.error('Error fetching User:', error);
          
    //     } finally {
    //       console.log('Done fetching User');
    //     }
    //   };
  
    //   fetchUser();
    // }, []);

    
    
  
    const handleAddAbout = async () => {
        if (about.trim() !== '') {
          try {
            setLoading(true);
            console.log('About:', about);
            const response = await axios.post("/api/users/about", { about })
            console.log('About inserted:', response.data);
            toast.success('About inserted');
            router.push("/education");
            // Reset form field
            setAbout('');
          } catch (error) {
            console.error('Error inserting About:', error);
            toast.error('Error inserting About');
          } finally {
            setLoading(false);
          }
        }
      };


  
    return (
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>About Me</h1>
        <div className='flex flex-col gap-4'>
          <textarea
            value={about}
            onChange={e => setAbout(e.target.value)}
            placeholder='Write about yourself...'
            className='border p-2'
            rows={5}
          />
           <button
          onClick={handleAddAbout}
          className='bg-blue-500 text-white p-2 rounded'
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Saving...' : 'Save About'}
        </button>
        </div>
      </div>
    );
  }

export default AboutPage;