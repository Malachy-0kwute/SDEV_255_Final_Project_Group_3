import { useEffect, useState } from "react";

function Courses() {
  // Store all courses received from the backend
  const [courses, setCourses] = useState([]);

  // Store the course selected by the user
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Track whether the edit form is open
  const [isEditing, setIsEditing] = useState(false);

  // Store the edit form values
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseCredit, setCourseCredit] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  // Store error and success messages
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Get all courses from the backend
  async function getCourses() {
    try {
      setError("");

      // Send a GET request to the backend API
      const response = await fetch("http://localhost:3000/api/course");

      if (!response.ok) {
        throw new Error("Unable to load courses.");
      }

      // Convert the response into JavaScript data
      const courseData = await response.json();

      // Save the courses in state
      setCourses(courseData);

      // Automatically select the first course
      if (courseData.length > 0) {
        setSelectedCourse(courseData[0]);
      } else {
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  // Load the courses when the page first opens
  useEffect(() => {
    getCourses();
  }, []);

  // Open the edit form and fill it with the selected course information
  function startEditing() {
    if (!selectedCourse) {
      return;
    }

    setCourseCode(selectedCourse.courseCode || "");
    setCourseTitle(selectedCourse.courseTitle || "");
    setCourseSubject(selectedCourse.courseSubject || "");
    setCourseCredit(selectedCourse.courseCredit || "");
    setCourseDescription(selectedCourse.courseDescription || "");

    setError("");
    setMessage("");
    setIsEditing(true);
  }

  // Close the edit form without saving changes
  function cancelEditing() {
    setIsEditing(false);
  }

  // Update the selected course
  async function updateCourse(event) {
    // Stop the page from refreshing
    event.preventDefault();

    if (!selectedCourse) {
      return;
    }

    // Store the updated course information
    const updatedCourse = {
      courseCode,
      courseTitle,
      courseSubject,
      courseCredit: Number(courseCredit),
      courseDescription,
    };

    try {
      setError("");
      setMessage("");

      // Send the updated course information to the backend
      const response = await fetch(
        `http://localhost:3000/api/course/${selectedCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourse),
        }
      );

      // Get the updated course returned by the backend
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to update course.");
      }

      // Close the edit form and show a success message
      setIsEditing(false);
      setMessage("Course updated successfully.");

      // Reload the courses to show the updated information
      await getCourses();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  // Delete the selected course
  async function deleteCourse() {
    if (!selectedCourse) {
      return;
    }

    // Ask the user to confirm before deleting
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedCourse.courseCode} ${selectedCourse.courseTitle}?`
    );

    // Stop if the user clicks Cancel
    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      // Send a DELETE request to the backend
      const response = await fetch(
        `http://localhost:3000/api/course/${selectedCourse._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete course.");
      }

      // Close the edit form and show a success message
      setIsEditing(false);
      setMessage("Course deleted successfully.");

      // Reload the courses after deleting
      await getCourses();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <main className="container-fluid py-4">
      <div className="row g-4">
        {/* Left side: Display all courses */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h4 mb-3">Courses</h2>

              {/* Display an error message */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {/* Display a success message */}
              {message && (
                <div className="alert alert-success">
                  {message}
                </div>
              )}

              {/* Display this message when there are no courses */}
              {!error && courses.length === 0 && (
                <p>No courses have been added yet.</p>
              )}

              {/* Display the list of courses */}
              <div className="list-group">
                {courses.map((course) => (
                  <button
                    key={course._id}
                    type="button"
                    className={`list-group-item list-group-item-action ${
                      selectedCourse?._id === course._id ? "active" : ""
                    }`}
                    onClick={() => {
                      // Select the course that the user clicked
                      setSelectedCourse(course);

                      // Close the edit form when another course is selected
                      setIsEditing(false);

                      // Clear old messages
                      setMessage("");
                      setError("");
                    }}
                  >
                    <strong>{course.courseCode}</strong>{" "}
                    {course.courseTitle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Display course information or the edit form */}
        <div className="col-md-8">
          <div className="card shadow-sm h-100">
            <div className="card-body p-4">
              {selectedCourse ? (
                isEditing ? (
                  <>
                    {/* Edit course form */}
                    <h2 className="h3 mb-4">Edit Course</h2>

                    <form onSubmit={updateCourse}>
                      <div className="mb-3">
                        <label
                          htmlFor="editCourseCode"
                          className="form-label"
                        >
                          Course Code
                        </label>

                        <input
                          id="editCourseCode"
                          type="text"
                          className="form-control"
                          value={courseCode}
                          onChange={(event) =>
                            setCourseCode(event.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="editCourseTitle"
                          className="form-label"
                        >
                          Course Title
                        </label>

                        <input
                          id="editCourseTitle"
                          type="text"
                          className="form-control"
                          value={courseTitle}
                          onChange={(event) =>
                            setCourseTitle(event.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="editCourseSubject"
                          className="form-label"
                        >
                          Subject Area
                        </label>

                        <input
                          id="editCourseSubject"
                          type="text"
                          className="form-control"
                          value={courseSubject}
                          onChange={(event) =>
                            setCourseSubject(event.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="editCourseCredit"
                          className="form-label"
                        >
                          Credit Hours
                        </label>

                        <input
                          id="editCourseCredit"
                          type="number"
                          className="form-control"
                          value={courseCredit}
                          onChange={(event) =>
                            setCourseCredit(event.target.value)
                          }
                          min="1"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="editCourseDescription"
                          className="form-label"
                        >
                          Course Description
                        </label>

                        <textarea
                          id="editCourseDescription"
                          className="form-control"
                          rows="6"
                          value={courseDescription}
                          onChange={(event) =>
                            setCourseDescription(event.target.value)
                          }
                          required
                        />
                      </div>

                      {/* Save the updated course */}
                      <button
                        type="submit"
                        className="btn btn-success me-2"
                      >
                        Save Changes
                      </button>

                      {/* Close the edit form without saving */}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    {/* Display the selected course information */}
                    <h2 className="h3 mb-3">Course Information</h2>

                    <h3 className="h4">
                      {selectedCourse.courseCode}{" "}
                      {selectedCourse.courseTitle}
                    </h3>

                    <hr />

                    <p>
                      <strong>Subject Area:</strong>{" "}
                      {selectedCourse.courseSubject ||
                        "No subject area provided"}
                    </p>

                    <p>
                      <strong>Credits:</strong>{" "}
                      {selectedCourse.courseCredit}
                    </p>

                    <p>
                      <strong>Course Description:</strong>
                    </p>

                    <p>
                      {selectedCourse.courseDescription ||
                        "No description provided"}
                    </p>

                    {/* Open the edit course form */}
                    <button
                      type="button"
                      className="btn btn-primary me-2 mt-3"
                      onClick={startEditing}
                    >
                      Edit Course
                    </button>

                    {/* Delete the selected course */}
                    <button
                      type="button"
                      className="btn btn-danger mt-3"
                      onClick={deleteCourse}
                    >
                      Delete Course
                    </button>
                  </>
                )
              ) : (
                <p>Select a course to view its details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Courses;