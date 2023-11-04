import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "tailwindcss/tailwind.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import TaskList from "./components/Task Management/TaskList";
import { AuthProvider } from "./components/AuthContext"; 
import Dashboard from "./components/Task Management/Dashboard";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route
            path="/signin"
            element={<SignIn onSignIn={() => setIsAuthenticated(true)} />}
          />
          {isAuthenticated ? (
            <>
              {/* <Route path="/todolist" element={<TodoList />} /> */}
              <Route path="/tasklist" element={<Dashboard />} />
              <Route path="/dashboard" element={<TaskList />} />
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
