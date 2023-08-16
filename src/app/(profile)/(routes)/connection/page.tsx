"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'

interface Connection {
  name: string;
  role: string;
  company: string;
}

export default function MyConnection() {
  const initialConnections: Connection[] = [
    {
      name: 'Alice',
      role: 'Software Engineer',
      company: 'TechCorp'
    },
    {
      name: 'Bob',
      role: 'Product Manager',
      company: 'InnovateTech'
    },
    {
      name: 'Charlie',
      role: 'Designer',
      company: 'DesignCo'
    },
    {
      name: 'David',
      role: 'Marketing Specialist',
      company: 'MarketGenius'
    },
    {
      name: 'Emma',
      role: 'Data Scientist',
      company: 'DataTech'
    },
    {
      name: 'Frank',
      role: 'Sales Representative',
      company: 'SalesPro'
    },
    {
      name: 'Grace',
      role: 'HR Manager',
      company: 'TalentHub'
    },
    {
      name: 'Henry',
      role: 'Financial Analyst',
      company: 'FinanceWiz'
    },
    {
      name: 'Isabella',
      role: 'UX/UI Designer',
      company: 'UIXperience'
    },
    {
      name: 'Jack',
      role: 'Operations Manager',
      company: 'OperateNow'
    }
  ];
  

  const [connectedUsers, setConnectedUsers] = useState<Connection[]>([]);
  const [unconnectedUsers, setUnconnectedUsers] = useState<Connection[]>(initialConnections);

  const handleConnect = (index: number) => {
    // Create a copy of the unconnectedUsers array
    const newUnconnectedUsers = [...unconnectedUsers];
  
    // Remove the connected user from the newUnconnectedUsers array
    // Splice returns an array containing the removed elements, and [0] accesses the first (and only) element
    const connectedUser = newUnconnectedUsers.splice(index, 1)[0];
  
    // Update the state of unconnectedUsers with the modified array
    setUnconnectedUsers(newUnconnectedUsers);
  
    // Update the state of connectedUsers with the connectedUser added to the beginning
    setConnectedUsers([connectedUser, ...connectedUsers]);
  };

  const handleRemove = (index: number) => {
    // Get the disconnected user from the connectedUsers array
    const disconnectedUser = connectedUsers[index];
  
    // Filter out the disconnected user from the connectedUsers array
    // This creates a new array without the disconnected user
    const updatedConnectedUsers = connectedUsers.filter((_, i) => i !== index);
  
    // Add the disconnected user back to the unconnectedUsers array
    // This creates a new array by spreading the existing unconnectedUsers array and appending the disconnectedUser
    const updatedUnconnectedUsers = [...unconnectedUsers, disconnectedUser];
  
    // Update the state of connectedUsers and unconnectedUsers
    setConnectedUsers(updatedConnectedUsers);
    setUnconnectedUsers(updatedUnconnectedUsers);
  };
  


    return (
      <div className="flex flex-col m-4 bg-[#FAFBFF] overflow-scroll ">
      <div className="flex sticky top-0 bg-[#1E2875] w-[1100px] sm:m-4 md:ml-[255px] lg:ml-[255px] rounded-md h-[77px] ">
        <div className="flex justify-center m-3">
          <h1 className="text-[#FFF] text-[24px] font-[500] leading-[normal]">My Connections</h1>
        </div>     
      </div>

      <div className="flex flex-col md:ml-[300px] lg:ml-[300px] mb-6">
        <div className="flex items-center md:justify-start lg:justify-start justify-center flex-wrap gap-8 ">
          {connectedUsers.map((connection, index) => (
              <div key={index} className="flex items-center gap-3 border rounded-[5px] border-[#00000026] w-[222px] h-[119px] p-3 ">
                <div className="flex flex-col gap-[6px]">
                  <p className="text-[#1F1F1FCC] text-[11px] font-[600] leading-[normal]">{connection.name}</p>
                  <div className="flex flex-col">
                    <p className="text-[#1F1F1FCC] text-[11px] font-[400] leading-[normal]">{connection.role}</p>
                    <p className="text-[#1F1F1FCC] text-[11px] font-[400] leading-[normal]">{connection.company}</p>
                  </div>
                  <div className="bg-[#BAB6EB] p-2 mt-2 w-[115px] cursor-pointer h-[14px] border rounded-[64px] flex items-center justify-center " onClick={() => handleRemove(index)}>
                    <p
                      
                      className="text-[#1F1F1FCC] text-[10px] font-[500] leading-[normal] "
                    >
                      Remove Connection
                    </p>
                  </div>
                </div>
                <div className="w-[100px] h-[100px] rounded-[0.889px] overflow-hidden">
                  <Image src="/images/Profile.png" alt="logo" width={100} height={100} className="bg-[#FFA78D] rounded-full object-contain" />
                </div>
              </div>
            ))}
  
  
             </div>
  
  
  
             <div className='flex items-center justify-center md:justify-start lg:justify-start mt-8'>
           <h1 className='text-[#222222E5] text-[20px] font-[300] leading-[normal]'>People you can also connect</h1>
           </div>
  
           <div className="flex items-center mt-8 md:justify-start lg:justify-start justify-center mb-9 flex-wrap gap-8">
          {unconnectedUsers.map((connection, index) => (
      // Render potential connections only if not already connected
      connection && (
        <div key={index} className="flex items-center gap-3 border rounded-[5px] border-[#00000026] w-[222px] h-[119px] p-3 ">
          <div className="flex flex-col gap-[6px]">
            <p className="text-[#1F1F1FCC] text-[11px] font-[600] leading-[normal]">{connection.name}</p>
            <div className="flex flex-col">
              <p className="text-[#1F1F1FCC] text-[11px] font-[400] leading-[normal]">{connection.role}</p>
              <p className="text-[#1F1F1FCC] text-[11px] font-[400] leading-[normal]">{connection.company}</p>
            </div>
            <div className="bg-[#BAB6EB] p-2 mt-2 w-[115px] h-[14px] border cursor-pointer rounded-[64px] flex items-center justify-center" onClick={() => handleConnect(index)}>
              <p
                
                className="text-[#1F1F1FCC] text-[10px] font-[500] leading-[normal] "
              >
                Connect
              </p>
            </div>
          </div>
          <div className="w-[100px] h-[100px] rounded-[0.889px] overflow-hidden">
            <Image src="/images/Profile.png" alt="logo" width={100} height={100} className="bg-[#FFA78D] rounded-full object-contain" />
          </div>
        </div>
      )
    ))}
  </div>
  
  
  
  
  
            </div> 
      
  
      </div>
    )
  }