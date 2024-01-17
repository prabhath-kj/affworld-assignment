"use client";

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "@/state/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import authApi from "@/services/authServices";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegistrationForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const { user, token, message } = await authApi.register(values);
      dispatch(
        setLogin({
          user,
          token,
        })
      );
      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Join us Now
        </div>

        <div className="mt-10">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="flex flex-col mb-5">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                    id="username"
                    type="text"
                    name="username"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-5">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                    id="email"
                    type="text"
                    name="email"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                    type="password"
                    name="password"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-5">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"></div>

                  <Field
                    type="password"
                    name="confirmPassword"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Sign Up</span>
                </button>
              </div>
              <div>
                <div className="flex  text-sm justify-end mt-1">
                  Have an account?
                  <Link
                    className="px-1 font-medium cursor-pointer hover:font-bold text-blue-500"
                    href="/login"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
