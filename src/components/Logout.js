import React from "react";
import { useNavigate } from "react-router-dom"; // If you're using React Router

const Logout = () => {
  const history = useNavigate();

  const handleLogout = () => {
    // Perform the logout action here, which may include clearing user data and changing the authentication state

    // For example, clear user data from local storage and change the authentication state
    localStorage.removeItem("userToken");
    // You might have more data to clear

    // Redirect to the login page
    history.push("/login"); // Replace "/login" with your login route
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
