import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://usermanagement-server-0d1v.onrender.com/api/user/${id}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://usermanagement-server-0d1v.onrender.com/api/user/${id}`);
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  if (!user) return <div className="text-center text-lg">User not found</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <p className="text-lg font-semibold">First Name: <span className="font-normal">{user.firstName}</span></p>
      <p className="text-lg font-semibold">Last Name: <span className="font-normal">{user.lastName}</span></p>
      <p className="text-lg font-semibold">Email: <span className="font-normal">{user.email}</span></p>
      <p className="text-lg font-semibold">Phone: <span className="font-normal">{user.phone}</span></p>
      <p className="text-lg font-semibold">Address: <span className="font-normal">{user.address}</span></p>

      <div className="mt-6 space-x-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          onClick={() => navigate(`/edit-user/${user._id}`)}
        >
          Edit
        </button>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
