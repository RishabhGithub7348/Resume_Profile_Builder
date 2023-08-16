import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function ProfileLayout({
    children,
  }:{
      children: React.ReactNode
  }) {
      return (
         <>
          <div className="md:flex lg:flex md:overflow-hidden lg:overflow-hidden overflow-x-hidden  h-screen">
            <Sidebar  />
            <div className="flex flex-col  ">
                <div className=''>
                <Navbar />
                </div>
                <div className=" lg:mt-[74px] md:mt-[74px] mt-28 ">{children}</div>
            </div>
        </div>
         </>
      )
  }