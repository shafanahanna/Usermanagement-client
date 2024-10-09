import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserForm from "./User.jsx";
import EditUser from "./Edituser.jsx";

import UserDetails from "./Userdetails.jsx";
import UserList from "./Userlist.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/user/:id" element={<UserDetails />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
    </Routes>
  );
}

export default App;
