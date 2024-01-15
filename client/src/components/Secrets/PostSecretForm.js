"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  secretInput: Yup.string().required("Please enter your secret"),
});

const PostSecret = () => {
  const handlePostSecret = (values, setSubmitting, resetForm) => {
    console.log(values);
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Post a Secret</h2>
      <Formik
        initialValues={{ secretInput: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handlePostSecret(values, setSubmitting, resetForm);
        }}
      >
        <Form>
          <Field
            type="text"
            name="secretInput"
            component="textarea"
            rows="4"
            placeholder="Enter your secret..."
            className="border p-2 mb-4 w-full resize-none"
          />
          <ErrorMessage
            name="secretInput"
            component="div"
            className="text-red-500 mt-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Post Secret
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PostSecret;
