import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams(); // Get user id from URL
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Fetch user details by ID to pre-fill the form
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        setInitialValues(response.data);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUser();
  }, [id]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.put(`https://usermanagement-server-0d1v.onrender.com/api/user/${id}`, values);
      navigate(`/user/${id}`); // Navigate back to details page after editing
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true} // Allow form to reinitialize when initialValues change
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                First Name:
              </label>
              <Field
                name="firstName"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Last Name:
              </label>
              <Field
                name="lastName"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Email:</label>
              <Field
                name="email"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Phone:</label>
              <Field
                name="phone"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Address:
              </label>
              <Field
                name="address"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUser;
