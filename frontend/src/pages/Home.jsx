import { Link } from "react-router-dom";

function Home() {
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
        <Link className="btn btn-success me-3" to="/login">
          Login
        </Link>

        <Link className="btn btn-outline-success" to="/courses">
          View Courses
        </Link>
      </div>
    </div>
  );
}

export default Home;