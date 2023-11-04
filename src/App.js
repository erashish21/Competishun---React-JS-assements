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
//import TodoList from "./components/TodoList";

import TaskList from "./components/Task Management/TaskList";





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
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
            <Route path="/tasklist" element={<TaskList />} />
            
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/signin" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
