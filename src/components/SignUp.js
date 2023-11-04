import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.fullname) {
      validationErrors.fullname = "Fullname is required.";
    }
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

  const handleSignUp = () => {
    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const newUser = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      };

      if (existingUsers.some((user) => user.email === newUser.email)) {
        alert("Email is already taken. Please choose a different one.");
      } else {
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        alert("User registered successfully!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-extrabold mb-4">Todo List</h1>
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              className="text-gray-600 text-sm font-medium block mb-2"
              htmlFor="fullname"
            >
              Fullname
            </label>
            <input
              className={`w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 ${
                errors.fullname ? "border-red-500" : ""
              }`}
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
            )}
          </div>
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
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              type="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="text-grey-dark mt-6">
            Already have an account?{" "}
            <a
              className="no-underline border-b border-blue text-blue"
              href="/signin"
            >
              Log in
            </a>
            .
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
