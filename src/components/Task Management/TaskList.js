import React, { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleEditTask = (index) => {
    setEditingTask(index);
  };

  const handleSaveTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Task Management</h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded shadow"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleCreateTask}
        >
          Add Task
        </button>
        <ul className="mt-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b border-gray-300 hover:bg-gray-100 transition duration-200"
            >
              {editingTask === index ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleSaveTask(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ) : (
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                  className={task.completed ? "text-gray-500" : ""}
                >
                  {task.text}
                </span>
              )}
              <div>
                {editingTask === index ? (
                  <button
                    onClick={() => handleSaveTask(index, task.text)}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(index)}
                    className="p-2 text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleCompleteTask(index)}
                  className="p-2 text-green-500 hover:text-green-700"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
