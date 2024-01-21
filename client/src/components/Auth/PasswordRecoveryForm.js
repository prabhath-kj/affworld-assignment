"use client";
import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import authApi from "@/services/authServices";
import { toast } from "react-hot-toast";


const stepOneValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const stepTwoValidationSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
});

const ForgotPassword = () => {


  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const initialValues = {
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleForgotPassword = async (values) => {
    try {
      const { email } = values;
      setEmail(email);
      const { message } = await authApi.recoverPassword(values);
      toast(message);
      setStep(2);
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePasswordReset = async (values, { resetForm }) => {
    try {
      const { message, error } = await authApi.verifyPassword({
        ...values,
        email,
      });
      if (message) {
        toast(message);
      } else if (error) {
        toast(error);
      }
    } catch (err) {
      toast("internal server error");
    } finally {
      resetForm();
    }
  };

  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Recover Password
          </div>
          <div className="w-full py-6 z-20">
            {step === 1 && (
              <Formik
                initialValues={initialValues}
                validationSchema={stepOneValidationSchema}
                onSubmit={handleForgotPassword}
              >
                <Form className="mt-6">
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
                      className="text-red-500 text-normal mt-1"
                    />
                  </div>

                  <div className="flex w-full ">
                    <button
                      type="submit"
                      className="mt-2 flex  items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                    >
                      Send Otp
                    </button>
                  </div>
                </Form>
              </Formik>
            )}

            {step === 2 && (
              <Formik
                initialValues={initialValues}
                validationSchema={stepTwoValidationSchema}
                onSubmit={handlePasswordReset}
              >
                <Form action="" className="mt-6">
                  <div className="pt-4">
                    <Field
                      type="text"
                      autoComplete="off"
                      name="otp"
                      placeholder="Enter OTP"
                      className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="pt-4">
                    <Field
                      type="password"
                      autoComplete="off"
                      name="newPassword"
                      placeholder="New Password"
                      className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="pt-4">
                    <Field
                      type="confirmPassword"
                      autoComplete="off"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex w-full">
                    <button
                      type="submit"
                      className="flex  items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            )}
            <Link href="/login" className="text-end text-black">
              Back to login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
