// App.js
import Landing from "./screens/landing";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NoPage from "./screens/nopage";
import Dashboard from "./screens/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing type={"register"} />} />
      <Route path="/register" element={<Landing type={"register"} />} />
      <Route path="/login" element={<Landing type={"login"} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}


export default App;
