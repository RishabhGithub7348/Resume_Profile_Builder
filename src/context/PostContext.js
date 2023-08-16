'use client'

import { useEffect, useState, createContext } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";


export const PostContext = createContext({});


export const PostProvider = ({ children }) => {
    const [aboutData, setAboutData] = useState();
    const [user, setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const [certification , setCertification] = useState([]);
    const [experience , setExperience] = useState([]);
    const [education , setEducation] = useState([]);
    const [image, setImage] = useState(null);
    const [id, setId] = useState(null);
    const [isAuth, setIsAuth] = useState(false)

  
      
    
    

    useEffect(() => {
        const fetchAbout = async () => {
          try {
            const response = await axios.get("/api/users/about");
            console.log('Fetched About:', response.data);
            setAboutData(response.data.about);
          } catch (error) {
            console.error('Error fetching About:', error);
            
          } finally {
            console.log('Done fetching About');
          }
        };
    
        fetchAbout();
      }, [setUser,setIsAuth,id,setId]);

      useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get("/api/users/detail");
            console.log('Fetched User:', response.data.data);
            setUser(response.data.data);
            setId(response.data.data._id);
          } catch (error) {
            console.error('Error fetching User:', error);
            
          } finally {
            console.log('Done fetching User');
          }
        };
    
        fetchUser();
      }, [setIsAuth, isAuth]);
      console.log(id);


      useEffect(() => {
        const fetchSkill = async () => {
          try {
            const response = await axios.get("/api/users/skill");
            console.log('Fetched Skill:', response.data[0].skillsToAdd);
            setSkills(response.data[0].skillsToAdd);
          } catch (error) {
            console.error('Error fetching Skill:', error);
            
          } finally {
            console.log('Done fetching Skill');
          }
        };
    
        fetchSkill();
      }, [setUser,setIsAuth, id,setId]);

      useEffect(() => {
        const fetchCertification = async () => {
          try {
            const response = await axios.get("/api/users/certification");
            console.log('Fetched Certification:', response.data[0]);
            setCertification(response.data[0]);
          } catch (error) {
            console.error('Error fetching Certification:', error);
            
          } finally {
            console.log('Done fetching Certification');
          }
        };
    
        fetchCertification();
      }, [setUser,setIsAuth, id,setId]);


      useEffect(() => {
        const fetchExperience = async () => {
          try {
            const response = await axios.get("/api/users/experience");
            console.log('Fetched Experience:', response.data);
            setExperience(response.data[0]);
          } catch (error) {
            console.error('Error fetching Experience:', error);
            
          } finally {
            console.log('Done fetching Experience');
          }
        };
    
        fetchExperience();
      },[setUser,setIsAuth, id,setId])

        useEffect(() => {
            const fetchEducation = async () => {
              try {
                const response = await axios.get("/api/users/education");
                console.log('Fetched Education:', response.data[0]);
                setEducation(response.data[0]);
              } catch (error) {
                console.error('Error fetching Education:', error);
                
              } finally {
                console.log('Done fetching Education');
              }
            };
        
            fetchEducation();
          
        },[setEducation,id,setId])

        useEffect(() => {
            const fetchImage = async () => {
              try {
                const response = await axios.get("/api/users/profile");
                console.log('Fetched Image:', response.data.profilePic
                );
                setImage(response.data.profilePic);
              } catch (error) {
                console.error('Error fetching Image:', error);
                
              } finally {
                console.log('Done fetching Image');
              }
            };
        
            fetchImage();
          
        
        }, [setUser,setIsAuth, id,setId])

        




    return (
        <PostContext.Provider value={{ aboutData, setAboutData, user, setUser, skills, setSkills , certification, setCertification
        , experience, setExperience , education, setEducation, image, setImage, id, isAuth, setIsAuth
        
        }}>
            <div>
                {children}
            </div>
        </PostContext.Provider>
    )
} 


