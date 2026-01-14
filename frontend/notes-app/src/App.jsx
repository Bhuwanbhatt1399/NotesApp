import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected route (later we’ll secure it) */}
        <Route path="/dashboard" element={<Home />} />

      </Routes>
    </Router>
  );
};

export default App;

