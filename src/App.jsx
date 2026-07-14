import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import AddCourse from "./pages/AddCourse";

import "./App.css";

function App() {
  const [courses, setCourses] = useState([
    {
      code: "SDEV-255",
      title: "Full Stack Web Development",
      prerequisites: "SDEV-153",
      program: "Software Development",
      creditHours: "3",
      lectureHours: "3",
      revisionDate: "2026-07-13",
      description:
        "This course introduces students to full stack web development using modern frontend and backend technologies.",
      objectives: [
        "Build responsive web applications.",
        "Create user interfaces with HTML, CSS, and JavaScript.",
        "Develop backend applications using Node.js and Express.",
      ],
    },
  ]);

  function addCourse(newCourse) {
    setCourses((currentCourses) => [...currentCourses, newCourse]);
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/courses"
          element={<Courses courses={courses} />}
        />
        <Route
          path="/add-course"
          element={<AddCourse onAddCourse={addCourse} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;