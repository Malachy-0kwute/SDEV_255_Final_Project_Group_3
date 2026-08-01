import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-success">
      <div className="container d-flex justify-content-between align-items-center">

        <Link className="navbar-brand fw-bold" to="/">
          Ivy Tech Community College
        </Link>

        <div className="d-flex gap-3">
          <Link className="nav-link text-white" to="/">
            Home
          </Link>

          <Link className="nav-link text-white" to="/add-course">
            Add Course
          </Link>

          <Link className="nav-link text-white" to="/courses">
            Courses
          </Link>

          <Link className="nav-link text-white" to="/profile">
            Profile
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;