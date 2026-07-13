import React from "react";

function AddCourse() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left Panel */}
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Course Actions</h5>

            <button className="btn btn-success mb-3">
              + Add Course
            </button>

            <button className="btn btn-danger">
              Remove Course
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-md-9">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-4">Course Information</h4>

            <form>
              <div className="mb-3">
                <label className="form-label">Course Title</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Course Code</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Prerequisites</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">STEM Math</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Program</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Credit Hours</label>
                <input type="number" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Lecture Hours</label>
                <input type="number" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Date of Last Revision</label>
                <input type="date" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Course Description</label>
                <textarea className="form-control" rows="6"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Major Course Learning Objectives
                </label>
                <textarea className="form-control" rows="4"></textarea>
              </div>

              <button className="btn btn-success">
                + Add Learning Objective
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;