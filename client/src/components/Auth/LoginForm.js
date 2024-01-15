"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";

const LoginForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      console.log(values);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
 const handleGoogleSignIn=(credentialResponse)=>{
    const token =credentialResponse?.credential
    console.log(token)
 }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Login
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-10">
              <div className="flex flex-col mb-5">
                <Field
                  type="email"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex flex-col mb-6">
                <Field
                  type="password"
                  name="password"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
              <div>
                <div className="flex justify-end mt-1">
                  Have an account?
                  <Link
                    className="px-1 font-medium cursor-pointer hover:font-bold text-blue-500"
                    href="/register"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col justify-center items-center">
          <div className="">or continue with</div>
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
