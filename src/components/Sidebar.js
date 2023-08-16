"use client"
import Link from "next/link";
import Image from "next/image";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import axios from "axios";
import { PostContext } from "@/context/PostContext";
import { useContext } from "react";

const Sidebar = () => {
  const {isAuth, setIsAuth} = useContext(PostContext)
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            setIsAuth(false);
            router.push('/login')
            router.refresh();
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <div className="bg-[#FFFFFF] w-[250px] custom p-5 h-screen hidden min-[1200px]:block lg:hidden md:hidden fixed z-30 flex-shrink-0">
            <div className="flex  flex-col  justify-between h-full  ">
            <div className="flex flex-col  gap-9">
             <div className="flex justify-end items-end">
             <div className="flex justify-center   items-center rounded-[8px] p-3 border border-[#00000026] text-[#222222E5] w-[183px] h-[47px]">
                <p className="text-[#222222E5] text-[24px] font-[500] leading-[normal]">DashBoard</p>
              </div>
             </div>
              <div className="flex gap-4 justify-center items-center ">
                <div>
                 <Image src="/images/arrow-left.svg" alt="logo" width={14} height={14}   />
                </div>
                <div className="flex  justify-center items-center rounded-[8px] p-3 border border-[#413B89] text-[#222222E5] w-[183px] h-[47px]">
                <Link
                href="/profile"
                >
                  <p className="text-[#222222E5] text-[20px] font-[400] leading-[normal]">My Profile</p>
                </Link>
                </div>
              </div>
              <div className="flex gap-4 justify-center items-center ">
                <div>
                 <Image src="/images/arrow-left.svg" alt="logo" width={14} height={14}   />
                </div>
                <div className="flex  justify-center items-center rounded-[8px] p-3 border border-[#413B89] text-[#222222E5] w-[183px] h-[47px]">
                <Link
                href="/connection"
                >
                  <p className="text-[#222222E5] text-[20px] font-[400] leading-[normal]">My Connection</p>
                </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-auto">
             
             <button  onClick={logout} className="text-[#222222E5] text-[16px] font-[500] leading-[normal]">Logout</button>
             
            </div>
            </div>
        </div>
    );
};

export default Sidebar;