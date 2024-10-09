import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const UserForm = () => {
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First Name must be at least 2 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Last Name must be at least 2 characters")
      .required("Last Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string()
      .min(5, "Address must be at least 5 characters")
      .required("Address is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      
      await axios.post("https://usermanagement-server-0d1v.onrender.com/api/user/", values);

      
      setSubmitMessage("User details successfully submitted!");

      
      navigate("/user", { state: { user: values } });

    
      resetForm();
    } catch (error) {
      setSubmitMessage("An error occurred while submitting user details.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">User Details Form</h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="firstName">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="lastName">
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="phone">
                Phone Number
              </label>
              <Field
                name="phone"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="address">
                Address
              </label>
              <Field
                name="address"
                as="textarea"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isValid || !dirty || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>

      {submitMessage && (
        <p className="mt-4 text-center text-green-500">{submitMessage}</p>
      )}
    </div>
  );
};

export default UserForm;
