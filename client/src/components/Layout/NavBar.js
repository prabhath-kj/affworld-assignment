"use client";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import MobileOverLay from "./MobileOverLay";
import React from "react";
import { setLogout } from "@/state/authSlice";
import {useDispatch} from "react-redux"
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch =useDispatch()
  const router =useRouter()


  const titles = [
    {
      title: "Pricing",
      path: "#pricing",
    },
    {
      title: "Teams",
      path: "#teams",
    },
  ];


  const handleLogout =()=>{
    dispatch(setLogout())
    googleLogout()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-100 opacity-100 shadow-md z-40">
      <div className="flex flex-wrap items-center justify-between  px-10 py-5">
        <Link href="/" className="font-semibold sm:text-4xl text-lg text-black">
          APP
        </Link>
        <div className="mobile-menu block md:hidden">
          {isOpen ? (
            <button className="px-2 py-2" onClick={() => setOpen(!isOpen)}>
              <XMarkIcon className="w-6 h-6 text-black" />
            </button>
          ) : (
            <button className="px-2 py-2" onClick={() => setOpen(!isOpen)}>
              <Bars3Icon className="w-6 h-6 text-black" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block lg:block md:w-auto" id="navBar">
          <ul className="flex  md:flex-row md:space-x-0 cursor-pointer">
            {/* {titles.map((title, index) => {
              return <li key={index}>{NavLink(title)}</li>;
            })} */}
            <li  onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
      <div>{isOpen && <MobileOverLay handleLogout={handleLogout} />}</div>
    </nav>
  );
};

export default Navbar;
