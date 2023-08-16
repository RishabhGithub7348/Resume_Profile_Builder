"use client";
import axios from "axios";
import Link from "next/link";
import React, {use, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Image from "next/image";

import { useContext } from "react";
import UpdateEducationModal from "@/components/model/UpdateEducationModal";
import UpdateExperienceModal from "@/components/model/UpdateExperienceModal";
import UpdateCertificationModal from "@/components/model/UpdateCertificationModal";
import { PostContext } from "@/context/PostContext";
import  ImageUpload from "@/components/ImageUpload";




export default function ProfilePage() {
    const router = useRouter()
    const {
      aboutData,
      setAboutData,
      user,
      skills,
      setSkills,
      setUser,
      certification,
      experience,
      education,
      image,
      setImage,

    } = useContext<any>(PostContext);
    const [isEditMode, setIsEditMode] = useState({
      username: false,
      email: false,
      phoneNumber: false,
    
    });
    const [isEditAboutMode, setIsEditAboutMode] = useState(false);
    const [isEditNameMode, setIsEditNameMode] = useState(false);
    const [isEditEmailMode, setIsEditEmailMode] = useState(false);
    const [isEditPhoneNumberMode, setIsEditPhoneNumberMode] = useState(false);
    const [editedAbout, setEditedAbout] = useState(aboutData);
    const [editedName, setEditedName] = useState(user?.username);
    const [editedEmail, setEditedEmail] = useState(user?.email);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(user?.number);
    const [editedSkills, setEditedSkills] = useState([...skills]); // Assuming skills is an array of strings
    const [isEditSkillsMode, setIsEditSkillsMode] = useState(false);
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
    const [editedCertification, setEditedCertification] = useState(certification);
    const [editedExperience, setEditedExperience] = useState(experience);
    const [editedEducation, setEditedEducation] = useState(education);
    

    // Extracting the first name from the full name
  const fullName = user?.username || '';
  const nameParts = fullName.split(' ');
  const firstName = nameParts.length > 0 ? nameParts[0] : '';

   const handleEditSkillsToggle = () => {
    setIsEditSkillsMode(!isEditSkillsMode);
     setEditedSkills([...skills]); // Reset editedSkills when toggling edit mode
   };

   const handleEditAboutToggle = () => {
    setIsEditAboutMode(!isEditAboutMode);
     setEditedAbout(aboutData); // Reset editedAbout when toggling edit mode
   
   }

   const handleEditNameToggle = () => {
    setIsEditNameMode(!isEditNameMode);
    setEditedName(user?.username);
    // Reset editedAbout when toggling edit mode
   
   }

   const handleEditEmailToggle = () => {
    setIsEditEmailMode(!isEditEmailMode);
    setEditedEmail(user?.email);
   // Reset editedAbout when toggling edit mode
   
   }

   const handleEditPhoneNumberToggle = () => {
    setIsEditPhoneNumberMode(!isEditPhoneNumberMode);
    setEditedPhoneNumber(user?.number);
      // Reset editedAbout when toggling edit mode
   
   }


   const handleImageUpload = async (imageUrl:any) => {
    try {  
      const response = await axios.post('/api/users/profile', {  
        profilePic: imageUrl,
      });
      console.log("response", response.data);
      setImage(imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Error uploading image');
    }
  };



    

    const handleEditEducation = (education:any) => {
      setEditedEducation(education);
      setIsEducationModalOpen(true);
    };
  
    

    const handleEditExperience = (experience:any) => {
      setEditedExperience(experience);
      setIsExperienceModalOpen(true);
    };

    const handleEditCertification = (certification:any) => {
      setEditedCertification(certification);
      setIsCertificationModalOpen(true);
    }
  
    

    

    const handleSaveChanges = async (fieldName: string) => {
      try {
        const updatedData = {
          username: isEditNameMode ? editedName : user?.username,
          email: isEditEmailMode ? editedEmail : user?.email,
          number: isEditPhoneNumberMode ? editedPhoneNumber : user?.number,
        };
    
        const response = await axios.put('/api/users/detail', updatedData);
        console.log('response', response.data);
    
        // Update the local state with the new data
        setUser((prevUser: any) => ({
          ...prevUser,
          ...updatedData,
        }));
    
        // Handle success, show a success toast
        toast.success('Profile updated successfully');
    
        // Turn off the edit mode for the corresponding field after successful save
        switch (fieldName) {
          case 'username':
            setIsEditNameMode(false);
            break;
          case 'email':
            setIsEditEmailMode(false);
            break;
          case 'phoneNumber':
            setIsEditPhoneNumberMode(false);
            break;
          default:
            break;
        }
      } catch (error) {
        // Handle error, show an error toast
        toast.error('Error updating profile');
      }
    };
    
    const  handleSaveAbout = async () => {
        try{
            const response = await axios.put("/api/users/about", {
                about: editedAbout,
            });
            console.log("response", response.data);
            setAboutData(editedAbout);
            toast.success("About updated successfully");
            setIsEditAboutMode(false);
           
        } catch (error) {
            toast.error("Error updating about");
            setIsEditAboutMode(false);
            
        }

    }
    
    

    const handleSaveSkills = async () => {
      try {
        const response = await axios.put("/api/users/skill", {
          skillsToAdd: editedSkills,
        });
        console.log("response", response.data);
        setSkills(editedSkills);
    
        // Handle success, show a success toast, or update context
        toast.success("Skills updated successfully");
        setIsEditSkillsMode(false);
      } catch (error) {
        // Handle error, show an error toast
        toast.error("Error updating skills");
        setIsEditSkillsMode(false);
      }
    };
    
    
    return (
      
        <>
        <UpdateEducationModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
      />
      <UpdateExperienceModal
        isOpen={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)} 
      />
      <UpdateCertificationModal
        isOpen={isCertificationModalOpen}
        onClose={() => setIsCertificationModalOpen(false)}
      
      />
      



       <div className=" lg:-ml-[15%] min-[1200px]:ml-0 flex relative  flex-col  bg-[#FAFBFF] mt-[15px] ">
        <div className='flex  bg-[#1E2875] w-[1100px]  lg:ml-[255px] md:ml-[255px] sm:m-5 rounded-md h-[169px]'>
          <div className="flex  justify-center m-3">
          <h1 className="text-[#FFF] text-[14px] font-[500] leading-[normal]">MY PROFILE</h1>
          </div>
          
        </div>
        <div className="   flex absolute z-10 flex-col  lg:ml-[305px] top-[88px] md:w-[900px]  lg:w-[900px] w-[600px]  h-[600px] bg-[#FFF] border rounded-[8px] border-[#EBEBEE] flex-shrink-0 shadow-md">
            <div className=" grid md:grid-cols-2 lg:grid-cols-2  grid-rows-2 md:gap-40 lg:gap-40 gap-20    ">
               <div className="col-span-1 md:w-[400px] lg:w-[400px]   lg:ml-5 md:ml-5">
                  <div className="flex flex-col justify-center  mt-4 gap-3">
                    <div className="flex items-center gap-32  p-3  ">
                      <div className="flex items-center justify-center rounded-full ml-4 bg-[#FFA78D] outline-none overflow-hidden w-[88px] h-[88px]">
                        <Image 
                        src={image ? image : "/images/profile.png"}
                         alt="logo" width={88} height={88} className=" object-contain outline-none " />
                      </div>
                       
                       <ImageUpload
                           onChange={(imageUrl) => {
                          setImage(imageUrl);
                          handleImageUpload(imageUrl);
                        
                    }}
                 />

      
                       
                       
                    </div>


                    <div className="flex flex-col  lg:ml-8 md:ml-8 p-3 w-[365px] h-[168px] rounded-[4px] border shadow-md  border-[#00000026] ">
                   
                    <div className=" flex flex-col gap-[9px] ">
                    <div className="flex flex-col gap-1">
                      <div>
                        <p  className="text-[#1F1F1FB2] text-[12px] font-[500] leading-[normal]">Your Name</p>
                      </div>
                      <div className="flex items-center justify-between ">
                        <div>
                        {isEditNameMode? (
                         <input
                          name="username"
                          type="text"
                         value={editedName}
                         onChange={(e) => setEditedName(e.target.value)}
                         className="border p-2 outline-none h-[26px] rounded-[64px] text-[#1F1F1FB2] text-[12px] font-[500] leading-[normal] "
                       />
                      ) : (
                      <p className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">{user?.username}</p>
                      )}
                            </div>
                            <div className="w-[40] flex items-center justify-center border  shadow-md pl-5 pr-5 pt-3 pb-3 h-[16px] rounded-[64px] bg-[#F0EFFA]">
                            <button
                            onClick={isEditNameMode ?() => handleSaveChanges("username") : handleEditNameToggle}
                           className="text-[Dark] text-[9px] font-[500] leading-[normal]"
                          >
                         {isEditNameMode? "Save" : "Edit"}
                           </button>

                       </div>
                      </div>
                      
                     </div>
                     <div className="flex flex-col gap-1">
                      <div>
                        <p  className="text-[#1F1F1FB2] text-[12px] font-[500] leading-[normal]">Email</p>
                      </div>
                      <div className="flex items-center justify-between ">
                        <div>
                        <div className="flex flex-col gap-1">
                    {isEditEmailMode ? (
                    <input
                    name="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="border p-2 outline-none h-[26px] rounded-[64px] text-[#1F1F1FB2] text-[12px] font-[500] leading-[normal] "
                     />
                   ) : (
                 <p className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">{user?.email}</p>
                  )}
                </div>

                            </div>
                            <div className="w-[40] flex items-center justify-center shadow-md border  pl-5 pr-5 pt-3 pb-3 h-[16px] rounded-[64px] bg-[#F0EFFA]">
                            <button
                            onClick={isEditEmailMode ? () => handleSaveChanges('email') : handleEditEmailToggle}
                            className="text-[Dark] text-[9px] font-[500] leading-[normal]"
                            >
                          {isEditEmailMode ? "Save" : "Edit"}
                         </button>
                       </div>
                      </div>
                      
                     </div>
                     <div className="flex flex-col  ">
                      <div>
                        <p  className="text-[#1F1F1FB2] text-[12px] font-[500] leading-[normal]">Phone Number</p>
                      </div>
                      <div className="flex items-center justify-between  ">
                        <div>
                        {isEditPhoneNumberMode ? (
                    <input
                    name="phoneNumber"
                    value={editedPhoneNumber}
                    onChange={(e) => setEditedPhoneNumber(e.target.value)}
                    className="border p-2 outline-none h-[26px] rounded-[64px]  text-[#1F1F1FB2] text-[12px] font-[500] leading-[normal] "
                     />
                   ) : (
                 <p className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">{user?.number}</p>
                  )}
                            </div>
                            <div className="w-[40] flex items-center justify-center  border  shadow-md  pl-5 pr-5 pt-3 pb-3 h-[16px] rounded-[64px] bg-[#F0EFFA]">
                            <button
                           onClick={isEditPhoneNumberMode ? () => handleSaveChanges("phoneNumber") : handleEditPhoneNumberToggle}
                          className="text-[Dark] text-[9px] font-[500] leading-[normal]"
                         >
                           {isEditPhoneNumberMode ? "Save" : "Edit"}
                        </button>
                       </div>
                      </div>
                      
                     </div>
                    </div>
                     
                    
                    
                    </div>

                    <div className="flex flex-col  lg:ml-8 md:ml-8 p-3 w-[365px] h-[110px] rounded-[4px] border shadow-md border-[#00000026] ">
                       <div className="flex flex-col gap-[2px]">
                        {/* //kjj */}
                       <div className="flex items-center justify-between ">
                        <div>
                           <div className="flex items-center gap-1">
                           <span  className="text-[#222222E5] text-[14px] font-[500] leading-[normal]">About</span> 
                            <span  className="text-[#413B89] text-[14px] font-[500] leading-[normal]">{firstName}</span>
                           </div>
                            </div>
                            <div className="w-[40] flex items-center  border  shadow-md justify-center  pl-5 pr-5 pt-3 pb-3 h-[16px] rounded-[64px] bg-[#F0EFFA]">
                            <button
                            onClick={isEditAboutMode ? handleSaveAbout :  handleEditAboutToggle}
                            className="text-[Dark] text-[9px] font-[500] leading-[normal]"
                            >
                          {isEditAboutMode ? "Save" : "Edit"}
                         </button>
                       </div>
                      </div>
                      <div className="mt-2">
                        {/* <p className="text-[#49454FCC] text-[11px] font-[400] leading-[normal]">{aboutData}</p> */}
                        {isEditAboutMode ? (
                          <textarea
                         value={editedAbout}
                        onChange={(e) => setEditedAbout(e.target.value)}
                       className=" p-1 text-[#49454FCC] rounded-md w-full shadow-sm border-2 outline-none text-[11px] font-[400] leading-[normal]"
                       rows={3}
                       />
                       ) : (
                       <p className="text-[#49454FCC] text-[11px] font-[400] leading-[normal]">{aboutData}</p>
                       )}
                      </div>
                       </div>
                    </div>

                    <div className="flex flex-col  lg:ml-8 md:ml-8 p-3 w-[365px] h-[110px] rounded-[4px] shadow-md border border-[#00000026] ">
                       <div className="flex flex-col gap-[9px]">
                       <div className="flex items-center justify-between ">
                        <div>
                        <p  className="text-[#222222E5] text-[14px] font-[500] leading-[normal]">Skills</p>
                            </div>
                            <div className="w-[40] flex items-center justify-center  border  shadow-md pl-5 pr-5 pt-3 pb-3 h-[16px] rounded-[64px] bg-[#F0EFFA]">
                            <button
                             onClick={isEditSkillsMode ? handleSaveSkills : handleEditSkillsToggle}
                            className="text-[Dark] text-[9px] font-[500] leading-[normal]"
                             >
                            {isEditSkillsMode ? "Save" : "Edit"}
                         </button>

                        
                       </div>
                      </div>
                      <div className="mt-1">
                         <div className="flex flex-col gap-2 ">
                         <div className="mt-1">
                 {isEditSkillsMode ? (
                 <div className="flex flex-col items-center gap-1 -mt-2">
                 {editedSkills.map((skill, index) => (
                 <div key={index} className="flex items-center  gap-24">
                  <input
                   value={skill}
                   onChange={(e) => {
                   const newSkills = [...editedSkills];
                   newSkills[index] = e.target.value;
                   setEditedSkills(newSkills);
                 }}
                 className="border-2 shadow-md p-2 outline-none h-[26px] rounded-[64px] text-[#1F1F1FB2] text-[12px] font-[500] leading-[normal]"
                />
                <button
                  onClick={() => {
                  const newSkills = editedSkills.filter((_, i) => i !== index);
                   setEditedSkills(newSkills);
              }}
                 className="text-[Dark] text-[9px] font-[500] leading-[normal] p-3 h-[16px] flex items-center justify-center rounded-[64px] bg-[#F0EFFA]"
              >
              Remove
            </button>
          </div>
        ))}
       
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        {skills?.map((skill:string, index:number) => (
          <p key={index} className="text-[#222222E5] text-[11px] font-[400] leading-[normal]">
            {skill}
          </p>
        ))}
      </div>
    )}
  </div>                   
                         </div>
                      </div>
                       </div>
                    </div>

                  </div>
               </div>
              <div className="col-span-1  shadow-lg lg:shadow-none md:shadow-none rounded-md lg:rounded-none lg:border-none ">
                    <div  className="p-5 ">
                    <div className="flex flex-col lg:mt-2 md:mt-2 mt-0  p-3 w-[300px] h-[71px] shadow-md rounded-[8px] border border-[#00000026] ">
                     <div className="flex items-center justify-center">
                       <div className="flex flex-col gap-1">
                          <div className="flex">
                            <p className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">Professional Details</p>
                          </div>
                          <div className="flex">
                            <p className="text-[#49454FCC] text-[12px] font-[400] leading-[normal]">This are the professional details shown to users in the app.</p>
                          </div>
                       </div>
                       <Image src="/images/star.svg" alt="profile" width={40} height={40} />
                     </div>
                    </div>

                    <div className="flex flex-col   p-3 w-[300px] h-auto ">
                    <div className="flex items-center mt-2 justify-between ">
                        <div>
                            <p  className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">Certifications</p>
                            </div>
                            <div className="w-[40] flex items-center justify-center  border  shadow-md  pl-5 pr-5 pt-3 pb-3 h-[16px] rounded-[64px] bg-[#F0EFFA]">
                        <button onClick={() => handleEditCertification(certification)}  className="text-[Dark]   text-[9px] font-[500] leading-[normal]">Edit</button>
                       </div>
                      </div>
                      <div className="flex items-center mt-2  justify-start w-[290px] h-[46px] shadow-md border rounded-[26px] border-[#CECECE]">
                       <div className="flex items-center w-[180px] justify-between p-2">
                         <div className="ml-2">
                         <Image src="/images/rate.svg" alt="profile" width={24} height={24} />
                         </div>
                         <div className="flex items-center flex-col ">
                            <p className="text-[#49454FCC] text-[12px] font-[400] leading-[normal]">{certification?.courseName}</p>
                            <p className="text-[#49454FCC] text-[12px] font-[400] leading-[normal]">{certification?.organization}</p>
                         </div>
                       </div>
                      </div>
                    </div>


                    <div className="flex flex-col      p-3 w-[300px] h-auto ">
                    <div className="flex items-center  justify-between ">
                        <div>
                            <p  className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">Experience</p>
                            </div>
                            <div className="w-[40] flex items-center justify-center  border  shadow-md pl-5 pr-5 pt-3 pb-3 h-[16px] rounded-[64px] bg-[#F0EFFA]">
                        <button onClick={() => handleEditExperience(experience)} className="text-[Dark]   text-[9px] font-[500] leading-[normal]">Edit</button>
                       </div>
                      </div>
                      <div className="">
                      

                      
                              <div  className="flex items-center mt-4 p-2 justify-between w-[290px] h-[48px] border rounded-[8px] shadow-lg border-[#CECECE]">
                              <div className="flex flex-col gap-1">
                                <div>
                                  {experience?.startYear && experience?.endYear ? (
                                    <p className="text-[#222222E5] text-[10px] font-[500] leading-[normal]">
                                      {`${experience?.endYear - experience?.startYear} years (${experience?.startYear}-${experience?.endYear})`}
                                    </p>
                                  ) : (
                                    <p className="text-[#222222E5] text-[10px] font-[500] leading-[normal]">
                                      {experience?.endYear}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <p className="text-[#222222E5] text-[10px] font-[400] leading-[normal]">{experience?.company}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <div>
                                  <p className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">{experience?.positionType}</p>
                                </div>
                                <div>
                                  <p className="text-[#222222E5] text-[10px] font-[400] leading-[normal]">--{experience?.role}</p>
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <Image src="/images/logo.png" alt="profile" width={47} height={24} />
                              </div>
                            </div>

                            <div  className="flex items-center mt-4 p-2 justify-between w-[290px] h-[48px] border rounded-[8px] shadow-lg border-[#CECECE]">
                              <div className="flex flex-col gap-1">
                                <div>
                                  {experience?.startYear && experience?.endYear ? (
                                    <p className="text-[#222222E5] text-[10px] font-[500] leading-[normal]">
                                      {`${experience?.endYear - experience?.startYear} years (${experience?.startYear}-${experience?.endYear})`}
                                    </p>
                                  ) : (
                                    <p className="text-[#222222E5] text-[10px] font-[500] leading-[normal]">
                                      {experience?.endYear}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <p className="text-[#222222E5] text-[10px] font-[400] leading-[normal]">{experience?.company}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <div>
                                  <p className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">{experience?.positionType}</p>
                                </div>
                                <div>
                                  <p className="text-[#222222E5] text-[10px] font-[400] leading-[normal]">--{experience?.role}</p>
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <Image src="/images/logo.png" alt="profile" width={47} height={24} />
                              </div>
                            </div>
                            
                         

                      
                      </div>

                    </div>

                    
                    <div className="flex flex-col     p-3 w-[300px] h-[71px] ">
                        <div className="flex items-center  justify-between ">
                          
                            <div>
                          
                                <p  className="text-[#222222E5] text-[12px] font-[500] leading-[normal]">Education</p>
                                </div>
                                <div className="w-[40] flex items-center justify-center  border  shadow-md pl-5 pr-5 pt-3 pb-3 h-[16px] rounded-[64px] bg-[#F0EFFA]">
                            <button  onClick={() => handleEditEducation(education)} className="text-[Dark]   text-[9px] font-[500] leading-[normal]">Edit</button>
                           </div>
                        </div>
                        
                           
                        
                      <div
                       
                        className="flex flex-col mt-3 pt-3 pb-1 p-2 border w-[290px] h-auto rounded-[8px] shadow-lg border-[#00000026]"
                          >
                         <div className="flex items-center p-2">
                           <p className="text-[#413B89] text-[12px] font-[500] leading-[normal]">
                       {education?.university}
                       </p>
                     </div>
                  <div className="flex items-center justify-between p-1">
                    <p className="text-[#222222E5] text-[11px] font-[500] leading-[normal]">
                     
                    {education?.startYear && education?.endYear ? (
                    `${education?.startYear}-${education?.endYear}`
                       ) : (
                      '\u00A0' // This is a non-breaking space character to maintain layout
                    )}
                     
                    </p>
                    <p className="text-[#222222E5] text-[11px] font-[500] leading-[normal]">
                  {education?.course}
                   </p>
                   </div>
                  <div className="flex items-center justify-center p-1">
                   <p className="text-[#222222E5] text-[10px] font-[400] leading-[normal]">
                  {education?.collegeInfo}
                </p>
                  </div>
                 </div>
             
                                      

                        
                    </div>
                  
                    
                    </div>

                   


              </div>

            </div>
          </div>
     </div> 
        </>
    )
}
