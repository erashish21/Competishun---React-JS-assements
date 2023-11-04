import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = {
        email: formData.email,
        password: formData.password,
      };

      const foundUser = existingUsers.find(
        (u) => u.email === user.email && u.password === user.password
      );

      if (foundUser) {
        alert("Sign in successful!");
        onSignIn();
        navigate("/tasklist");
      } else {
        alert("Sign in failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form>
          <div className="mb-4">
            <label
              className="text-gray-600 text-sm font-medium block mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.email ? "border-red-500" : ""
              }`}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="text-gray-600 text-sm font-medium block mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.password ? "border-red-500" : ""
              }`}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover-bg-blue-600 focus-outline-none focus-ring focus-ring-blue-200"
              type="button"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
