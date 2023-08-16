"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Home() {
 const pathname = usePathname();
 const router = useRouter();

  useEffect(() => {
    // Check if the current path is the root URL
    if (pathname === '/') {
      router.push('/about');
    }
  }, []);


  return <div></div>;
}
