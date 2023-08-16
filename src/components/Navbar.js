"use client";
import { useState,useEffect, useContext } from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {BsChevronDown, BsChevronUp} from 'react-icons/bs'

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { PostContext } from "@/context/PostContext";



const Navbar = () =>  {
    const router = useRouter();
    const { user , image} = useContext(PostContext);
    const [settingsVisible, setSettingsVisible] = useState(false);

   
    const toggleSettings = () => {
      setSettingsVisible(!settingsVisible);
    };

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            settingsVisible &&
            event.target &&
            !event.target.closest(".settings-container")
          ) {
            toggleSettings();
          }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [settingsVisible]);
    
    return (
    <div className="flex items-center justify-between  p-3 z-20 fixed h-[88px]  border-b bg-[#fff] border-gray-300 w-full  ">
        <div className="flex items-center justify-center  -mt-3 ">
            <div className="flex items-center gap-5  ">
            <Image src="/images/icon.svg" alt="logo" width={24} height={24} className="shrink-0 object-contain"  />
            </div>
            <div className="flex items-center  justify-center">
            <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={59} height={27} className="shrink-0 object-contain" />
            </Link>
            </div>
        </div>

        <div className="md:flex lg:flex items-center hidden  gap-[16px] space-x-4 w-[304px] h-[57px] ">
            <div className="flex items-center justify-center">
            <Image src="/images/bell.svg" alt="logo" width={24} height={24}  />
            </div>

            <div className="w-[263px] h-[54px] flex items-center gap-[10px] pt-[10px] pb-[10px] pl-[8px] pr-[8px] border-[1.024px] border-[#E8EFF7] rounded-[8px] ">
             <div >
             <Image src=
             
             {image ? image : "/images/profile.png"}
              alt="logo" width={33} height={33} className="flex items-center border rounded-md object-contain bg-[#FFA78D]"  />
             </div>
             <div className="flex flex-col  w-[168px] cursor-pointer" onClick={toggleSettings}>
               <div className="h-[14px]">
                <p className="text-[10px] font-[500] leading-[normal]  text-[#373B5C]">Welcome back,</p>
               </div>
               <div className="h-[24px]">
               <p className="text-[17px] font-[500] leading-[normal] text-[#373B5C]">{user?.username}</p>
                </div>
             </div>
             
             <div>
            
                <button onClick={toggleSettings}>
                
                {settingsVisible === true ? <BsChevronUp className="w-[18px] h-[18px]"/> : <BsChevronDown className="w-[18px] h-[18px]"/>}
                </button>
                {settingsVisible && (
            <div className="settings-container absolute top-[80px] right-5 bg-white  border-2 w-[150px]  border-gray-300 p-2 rounded-md shadow-md">
              {/* Settings content */}
              {/* For example: */}
             <div className="flex flex-col items-center gap-2">
               <div className="flex items-center justify-center">
               <Link href="/profile" onClick={()=> { 
                setTimeout(toggleSettings, 150)
                } }>
                <p className="text-[16px] font-[500] leading-[normal]  text-[#373B5C]">My Profile</p>
                </Link>
               </div>
                <hr  className="w-full  border-3"/>
                <Link href="/connection" onClick={()=> { 
                setTimeout(toggleSettings, 150)
                } }>
                    <p className="text-[16px] font-[500] leading-[normal]  text-[#373B5C]">Connection</p>
                
                </Link>
                <hr  className="w-full  border-3"/>
                <Link href="/about" onClick={()=> { 
                setTimeout(toggleSettings, 150)
                } }>
                    <p className="text-[16px] font-[500] leading-[normal]  text-[#373B5C]">Edit Setting</p>
                
                </Link>
                <hr  className="w-full  border-3"/>
                <button onClick={logout}
                    className="text-[16px] font-[500] leading-[normal]  text-[#373B5C]">Log Out
                
                </button>
         
             </div>
            </div>
          )}

            
             </div>
            </div>


            

        </div>

        <div className="flex items-center lg:hidden md:hidden  gap-[16px] space-x-4">
        
        <div className="flex items-center justify-center">
            <Image src="/images/bell.svg" alt="logo" width={29} height={29}  />
            </div>
            <button onClick={toggleSettings}>
        <div className="flex items-center ">
        <Image src=
             
             {image ? image : "/images/profile.png"}
              alt="logo" width={33} height={33} className="flex items-center border rounded-md object-contain bg-[#FFA78D]"  />
             </div>
        </button>
        {settingsVisible && (
            <div className="absolute top-[80px] right-5 bg-white  border-2 w-[150px]  border-gray-300 p-2 rounded-md shadow-md">
              {/* Settings content */}
              {/* For example: */}
             <div className="flex flex-col items-center gap-2">
               <div className="flex items-center justify-center">
               <Link href="/profile">
                <p className="text-[16px] font-[500] leading-[normal]  text-[#373B5C]">My Profile</p>
                </Link>
               </div>
                <hr  className="w-full  border-3"/>
                <Link href="/connection">
                    <p className="text-[16px] font-[500] leading-[normal]  text-[#373B5C]">Connection</p>
                
                </Link>
                <hr  className="w-full  border-3"/>
                <Link href="/about">
                    <p className="text-[16px] font-[500] leading-[normal]  text-[#373B5C]">Edit Setting</p>
                
                </Link>
                <hr  className="w-full  border-3"/>
                <button onClick={logout}
                    className="text-[16px] font-[500] leading-[normal]  text-[#373B5C]">Log Out
                
                </button>
         
             </div>
            </div>
          )}
        </div>

      
    </div>
  );

}
export default Navbar;