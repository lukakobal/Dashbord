import "./styles.css";
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function addTask() {
    if (!input.trim()) return;

    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput("");
  }
  return (
    <div className="app">
      <h1>My Dashboard</h1>

      <div className="card">
        <h2>Today's Tasks</h2>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add task..."
        />

        <button onClick={addTask}>Add</button>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
