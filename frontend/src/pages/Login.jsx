import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // navigation hook
  const navigate = useNavigate();

  // form state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate form inputs
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // send login data to backend
    const loginCredentials = {
      email,
      password
    };

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginCredentials)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {

        // Clear any existing token and user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Get the token and user data from the response
        const { token, userDetails } = data;

        // Store the token and user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user-claims", JSON.stringify({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName, 
          email: userDetails.email, 
          isStudent: userDetails.isStudent
        }));

        // Redirect to home page
        navigate("/profile");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred during login.", error);
    });

  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              required
              type="email"
              className="form-control"
              placeholder="Enter your email"
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

          <button className="btn btn-success w-100 mb-3"
          onClick={handleSubmit}>
            Login
          </button>
        </form>
        
      </div>
      <p className="text-center text-muted mt-4">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;