import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  // navigation hook
  const navigate = useNavigate();

  // form state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(false);

  // handle form submission
  const handleSubmit = (e) => {

    // prevent default form submission behavior
    e.preventDefault();
   
    // validate form inputs
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // send registration data to backend
    const registrationData = {
      firstName,
      lastName,
      email,
      password,
      isStudent: role
    };

    // send registration data to backend
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Registration successful!");
        // Redirect to login page
        navigate("/login");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred during registration.", error);
    });

  }

  // handle role change
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value === "true";
    setRole(selectedRole);
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Register</h2>

        <form>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              required
              type="email"
              className="form-control"
              placeholder="example@email.com"
              autoComplete="one-time-code"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              required
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select"
                    value={String(role)} onChange={handleRoleChange}>
              <option value="true" >Student</option>
              <option value="false">Teacher</option>
            </select>
          </div>

          <button type="submit" onClick={handleSubmit} className="btn btn-success w-100 my-3">
            Register
          </button>
        </form>
      </div>

      <p className="text-center text-muted mt-4">
        Have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

// export the Register component
export default Register;