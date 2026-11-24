import "./App.css";
import { useState } from "react";

import Navbar from "./components/Navbar";
import UserContext from "./context/UserContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Applications from "./pages/Applications";
import Tasks from "./pages/Tasks";
import Messages from "./pages/Messages";
import Payments from "./pages/Payments";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // Store the logged-in user's information
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar title="Freelancer Platform" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
