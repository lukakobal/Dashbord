import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask() {
    if (!input.trim()) return;

    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const taskCount = tasks.length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>My Dashboard</h1>

      <div className="card">
        <h2>Today's Tasks</h2>
        <p>{taskCount} tasks today</p>

        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          placeholder="Add task..."
        />

        <button onClick={addTask}>Add</button>

        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <span
                className={task.completed ? "completed" : ""}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "✅" : "⬜"} {task.text}
              </span>

              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
