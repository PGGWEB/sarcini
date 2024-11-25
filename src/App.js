import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [member, setMember] = useState("Gabriel");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Load tasks and completed tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    const storedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || {};
    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  // Save tasks and completed tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  // Handle admin login
  const handleLogin = () => {
    if (password === "PGGwebsrl2!") {
      setIsAdmin(true);
      setPassword("");
      alert("Ai intrat ca administrator!");
    } else {
      alert("Parola este incorectă!");
    }
  };

  // Add task
  const handleAddTask = () => {
    if (newTask.trim() === "") return alert("Introduceți o sarcină validă.");
    const updatedTasks = { ...tasks };
    if (!updatedTasks[member]) updatedTasks[member] = [];
    updatedTasks[member].push(newTask);
    setTasks(updatedTasks);
    setNewTask("");
  };

  // Mark task as completed
  const handleCompleteTask = (taskIndex) => {
    const updatedTasks = { ...tasks };
    const completedTask = updatedTasks[member].splice(taskIndex, 1)[0];

    const updatedCompletedTasks = { ...completedTasks };
    if (!updatedCompletedTasks[member]) updatedCompletedTasks[member] = [];
    updatedCompletedTasks[member].push(completedTask);

    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div className="container">
      <h1>Dashboard - Lista de Sarcini</h1>

      {/* Selectare Membru */}
      <div className="task-section">
        <label htmlFor="memberSelect">Selectează membrul:</label>
        <select
          id="memberSelect"
          value={member}
          onChange={(e) => setMember(e.target.value)}
        >
          <option value="Gabriel">Gabriel</option>
          <option value="Robert">Robert</option>
          <option value="Andreea">Andreea</option>
          <option value="Nicoleta">Nicoleta</option>
        </select>
      </div>

      {/* Sarcini Active */}
      <div className="task-section">
        <h2>Sarcini active pentru {member}</h2>
        <ul>
          {tasks[member]?.length > 0 ? (
            tasks[member].map((task, index) => (
              <li key={index} className="task-item">
                {task}
                <button onClick={() => handleCompleteTask(index)}>
                  Finalizează
                </button>
              </li>
            ))
          ) : (
            <p>Nu există sarcini active.</p>
          )}
        </ul>
      </div>

      {/* Sarcini Finalizate */}
      <div className="task-section">
        <h2>Istoric sarcini finalizate</h2>
        <ul>
          {completedTasks[member]?.length > 0 ? (
            completedTasks[member].map((task, index) => (
              <li key={index} className="completed-task">
                {task}
              </li>
            ))
          ) : (
            <p>Nu există sarcini finalizate.</p>
          )}
        </ul>
      </div>

      {/* Adăugare Sarcini (Admin) */}
      {isAdmin ? (
        <div className="task-section">
          <h3>Adaugă o sarcină</h3>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Introduceți sarcina"
          />
          <button onClick={handleAddTask}>Adaugă</button>
        </div>
      ) : (
        <div className="auth-container">
          <h3>Autentificare Admin</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduceți parola"
          />
          <button onClick={handleLogin}>Autentifică-te</button>
        </div>
      )}
    </div>
  );
};

export default App;
