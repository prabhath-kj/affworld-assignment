"use client"
import React ,{useEffect} from "react";
import Navbar from "@/components/Layout/NavBar";
import PostSecret from "@/components/Secrets/PostSecretForm";
import { useRouter } from "next/navigation";
import {useSelector} from "react-redux"
import dynamic from 'next/dynamic'


const HomePage = () => {

  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.token);
  const SecretsList = dynamic(() => import('@/components/Secrets/SecretsList'))

  useEffect(() => {
    if(!isAuth){
      router.push("/login");
    }
  }, [isAuth]);

  return (
    <>
      <Navbar />
      <section className="text-black bg-gray-100 h-screen mt-20 container px-2">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-8  xl:gap-16 sm:py-16 ">
          <PostSecret />
          <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
            <SecretsList />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
