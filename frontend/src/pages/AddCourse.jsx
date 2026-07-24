import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseCredit, setCourseCredit] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const courseData = {
      courseTitle,
      courseCode,
      courseSubject,
      courseCredit: Number(courseCredit),
      courseDescription,
    };

    try {
      const response = await fetch("http://localhost:3000/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to add course.");
      }

      setMessage("Course added successfully!");

      setCourseTitle("");
      setCourseCode("");
      setCourseSubject("");
      setCourseCredit("");
      setCourseDescription("");

      setTimeout(() => {
        navigate("/courses");
      }, 800);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <div className="container py-4">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Add Course</h2>

        {message && (
          <div className="alert alert-success">{message}</div>
        )}

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="courseTitle" className="form-label">
              Course Title
            </label>

            <input
              id="courseTitle"
              type="text"
              className="form-control"
              value={courseTitle}
              onChange={(event) => setCourseTitle(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="courseCode" className="form-label">
              Course Code
            </label>

            <input
              id="courseCode"
              type="text"
              className="form-control"
              value={courseCode}
              onChange={(event) => setCourseCode(event.target.value)}
              placeholder="Example: SDEV-255"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="courseSubject" className="form-label">
              Subject Area
            </label>

            <input
              id="courseSubject"
              type="text"
              className="form-control"
              value={courseSubject}
              onChange={(event) => setCourseSubject(event.target.value)}
              placeholder="Example: Software Development"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="courseCredit" className="form-label">
              Credit Hours
            </label>

            <input
              id="courseCredit"
              type="number"
              className="form-control"
              value={courseCredit}
              onChange={(event) => setCourseCredit(event.target.value)}
              min="1"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="courseDescription" className="form-label">
              Course Description
            </label>

            <textarea
              id="courseDescription"
              className="form-control"
              rows="6"
              value={courseDescription}
              onChange={(event) =>
                setCourseDescription(event.target.value)
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;