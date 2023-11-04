import React from "react";
import { Link } from "react-router-dom";
import TaskList from "./TaskList";
import { useAuth } from "../AuthContext"; // Import the useAuth hook

const Dashboard = () => {
  const { logout } = useAuth(); // Use the useAuth hook

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Link to="/profile" className="text-white hover:underline">
            User Profile
          </Link>
          <button
            className="text-white-500 hover:underline"
            onClick={logout} // Call the logout function
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto flex-grow p-4">
        <TaskList />
      </main>
    </div>
  );
};

export default Dashboard;
