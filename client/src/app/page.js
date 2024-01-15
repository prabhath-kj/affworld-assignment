import React from "react";
import Navbar from "@/components/Layout/NavBar";
import PostSecret from "@/components/Secrets/PostSecretForm";
import SecretsList from "@/components/Secrets/SecretsList";

const HomePage = () => {
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
