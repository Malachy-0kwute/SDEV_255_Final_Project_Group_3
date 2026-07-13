import { useState } from "react";

function Courses() {
  const courses = [
    {
      code: "SDEV-153",
      title: "Website Development",
      description:
        "This course introduces students to website development using HTML, CSS, and JavaScript.",
      objectives: [
        "Create structured webpages with HTML.",
        "Style webpages using CSS.",
        "Build responsive page layouts.",
        "Add basic interactivity with JavaScript.",
      ],
    },
    {
      code: "SDEV-255",
      title: "Full Stack Web Development",
      description:
        "This course introduces students to full stack web development using modern frontend and backend technologies.",
      objectives: [
        "Build responsive web applications.",
        "Create user interfaces with HTML, CSS, and JavaScript.",
        "Develop backend applications using Node.js and Express.",
        "Connect applications to databases.",
        "Deploy web applications.",
      ],
    },
    {
      code: "DBMS-130",
      title: "Database Systems",
      description:
        "This course introduces relational databases, database design, SQL, and data management.",
      objectives: [
        "Understand relational database concepts.",
        "Create database tables and relationships.",
        "Write SQL queries.",
        "Insert, update, and delete database records.",
      ],
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  return (
    <main className="container-fluid py-4">
      <div className="row g-4">
        {/* Left side: Course list */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h4 mb-3">Courses</h2>

              <div className="list-group">
                {courses.map((course) => (
                  <button
                    key={course.code}
                    type="button"
                    className={`list-group-item list-group-item-action ${
                      selectedCourse.code === course.code ? "active" : ""
                    }`}
                    onClick={() => setSelectedCourse(course)}
                  >
                    <strong>{course.code}</strong> {course.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Selected course details */}
        <div className="col-md-8">
          <div className="card shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h3 mb-3">Course Description</h2>

              <h3 className="h4">
                {selectedCourse.code} {selectedCourse.title}
              </h3>

              <p className="mt-3">{selectedCourse.description}</p>

              <h3 className="h4 mt-4">
                Major Course Learning Objectives
              </h3>

              <ul>
                {selectedCourse.objectives.map((objective, index) => (
                  <li key={`${selectedCourse.code}-${index}`}>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Courses;