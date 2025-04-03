import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";
import { isAuthenticated } from "./auth";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todo"
          element={isAuthenticated() ? <Todo /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;