"use client";

import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import authApi from "@/services/authServices";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "@/state/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.token);

  useEffect(() => {
    isAuth ? router.push("/") : router.push("/login");
  }, [isAuth]);

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const { user, token, message } = await authApi.login(values);
      dispatch(
        setLogin({
          user,
          token,
        })
      );
      console.log(user, token, message);
      toast.success(message);
    } catch (error) {
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    const { name, email, sub } = await jwtDecode(token);
    try {
      const { user, token, message } = await authApi.googleLogin({
        username: name,
        email,
        password: sub,
      });
      dispatch(
        setLogin({
          user,
          token,
        })
      );
      console.log(user, token, message);
      toast.success(message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Login
        </div>
        <div className="flex flex-col justify-center items-center px-2 py-2">
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <div className="mt-2">or continue with</div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                  className="text-red-500 text-normal mt-1"
                />
              </div>
              <div className="flex justify-end">
                <Link
                  className=" text-sm cursor-pointer hover:font-bold text-blue-500"
                  href="/forgotPassword"
                >
                  Recover Password
                </Link>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex  items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
              <div>
                <div className="flex justify-end text-sm mt-1">
                  Have an account?
                  <Link
                    className="px-1  cursor-pointer hover:font-bold text-blue-500"
                    href="/register"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
