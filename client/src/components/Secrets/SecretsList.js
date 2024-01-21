"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import secretApi from "@/services/secretServices";

const SecretsList = () => {
  const [secrets, setSecrets] = useState([]);

  const fetchSecrets = async () => {
    try {
      const { secrets } = await secretApi.getAllSecrets();
      console.log(secrets);
      setSecrets(secrets || []);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchSecrets();

    const intervalId = setInterval(() => {
      fetchSecrets();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Secrets</h2>

      <div className="w-full h-56 overflow-y-scroll">
        {secrets.map((secret) => (
          <div
            key={secret._id}
            className="w-full mb-2 px-2 py-2 flex items-start gap-2"
          >
            <div className="flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6  text-blue-500 text-center m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p className="text-sm text-gray-600 mb-1">Unknown</p>
            </div>
            
            <div className="px-2 py-2  border border-gray-200 shadow rounded-full ">
              <p className="text-sm">{secret?.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretsList;
