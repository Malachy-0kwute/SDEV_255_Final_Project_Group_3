import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const userClaims = JSON.parse(localStorage.getItem("user-claims")) || {};

  return (
    <main className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h4 mb-3">Details</h2>
              <p><strong>First Name:</strong> {userClaims.firstName || "N/A"}</p>
              <p><strong>Last Name:</strong> {userClaims.lastName || "N/A"}</p>
              <p><strong>Email:</strong> {userClaims.email || "N/A"}</p>
              <p><strong>Role:</strong> {userClaims.isStudent ? "Student" : "Teacher"}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h4 mb-3">Enrolled Courses</h2>
              {userClaims.enrolledCourses && userClaims.enrolledCourses.length > 0 ? (
                <ul className="list-group">
                  {userClaims.enrolledCourses.map((course) => (
                    <li key={course._id} className="list-group-item">
                      <strong>{course.courseTitle}</strong> ({course.courseCode})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No courses enrolled.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}

export default Profile;