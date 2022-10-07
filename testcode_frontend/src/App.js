import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Container, Row, Col, } from 'reactstrap';
import Login from "./components/Pages/Login/Login";
import Task from "./components/Pages/Task/Task";
import Location from "./components/Pages/Location/Location";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/task"
            element={<Task />}
          />
          <Route
            path="/location"
            element={<Location />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
