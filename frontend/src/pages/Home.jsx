import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-success fw-bold">
        Ivy Tech Community College
      </h1>

      <p className="lead mt-3">
        Welcome to the Course Management System
      </p>

      <p className="text-muted">
        Manage courses, view course information, and maintain the course catalog.
      </p>

      <div className="mt-4">

        {isLoggedIn && (
          <button className="btn btn-danger me-3" 
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user-claims");
                    setIsLoggedIn(false);
                    window.location.href = "/login";
                  }}>
            Logout
          </button>
        )}

        {!isLoggedIn && (
          <Link className="btn btn-success me-3" to="/login">
            Login
          </Link>
        )}        

        {!isLoggedIn && (

        <Link className="btn btn-success me-3" to="/register">
          Register
        </Link>
        )}

        <Link className="btn btn-outline-success" to="/courses">
          View Courses
        </Link>

      </div>
    </div>
  );
}

export default Home;