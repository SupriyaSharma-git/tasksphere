import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const color = [
  "bg-amber-300",
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-400",
  "bg-pink-400",
  "bg-red-300",
];

const MyTask = () => {
  const [newTask, setNewTask] = useState("");
  const [mytask, setmytask] = useState([]);
  const token = localStorage.getItem("token");
  const handleInputchange = (e) => {
    setNewTask(e.target.value);
  };
  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "https://tasksphere-qjf5.onrender.com/api/auth/mytask",
          { mytask: newTask },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setmytask(res.data.tasks || []);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleUpdateTask = async (taskId) => {
    const updatedText = prompt("Enter new task text:");
    if (updatedText && updatedText.trim() !== "") {
      try {
        const res = await axios.put(
          `https://tasksphere-qjf5.onrender.com/api/auth/mytask/${taskId}`,
          { mytask: updatedText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setmytask(res.data.tasks || []);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await axios.delete(
        `https://tasksphere-qjf5.onrender.com/api/auth/mytask/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setmytask(res.data.tasks || []);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://tasksphere-qjf5.onrender.com/api/auth/mytask", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setmytask(res.data.tasks || []);
    };
    fetchTask();
  }, []);

  const TaskColors = mytask.map((_, index) => color[index % color.length]);

  return (
    <div className="mt-10">
      <div className="text-blue-800 font-bold font-serif flex items-center justify-center text-3xl underline mb-10">
        MyTask
      </div>
      <div className="flex items-center justify-center mb-3">
        <input
          type="text"
          placeholder="Add Task"
          className="shadow-2xl border p-2 m-1 rounded"
          onChange={handleInputchange}
          value={newTask}
        />
        <button
          className="bg-green-700 p-2 m-1 font-bold text-white rounded cursor-pointer hover:bg-black hover:text-white"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mytask.length > 0 ? (  
          mytask.map((task, index) => (
            <div
              key={index}
              className={`bg-[#f7f7f8] shadow-2xl p-3 border border-gray-300 rounded-2xl flex flex-col m-3 ${TaskColors[index]}`}
            >
              <p className={`font-semibold  rounded p-2`}>{task.mytask}</p> 
              <div className="flex mt-3 gap-2 sm:grid-rows-1">
                <button
                  className="bg-green-400 p-1 rounded font-semibold text-sm cursor-pointer"
                  onClick={() => handleUpdateTask(task._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded font-semibold text-sm cursor-pointer"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : token ? null : (
          <p>No Task Added</p>
        )}
      </div>
    </div>
  );
};

export default MyTask;
