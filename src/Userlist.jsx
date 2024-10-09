import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://usermanagement-server-0d1v.onrender.com/api/user/");
        setUsers(response.data.data);
        console.log("Fetched users:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">All Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div>
              <h3 className="text-xl font-semibold text-blue-600">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Phone: {user.phone}</p>
              <p className="text-gray-700">Address: {user.address}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                onClick={() => navigate(`/user/${user._id}`)}
              >
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
