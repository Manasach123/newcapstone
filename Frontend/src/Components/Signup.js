import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(true);
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        email,
        password,
      });
      setMessage(alert(response.data.message));
      // navigate("/login");
    } catch (error) {
      setMessage("Error:" + (error.response?.data.message || error.message));
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url(https://example.com/social-app-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h2 className="text-center mb-4">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary btn-block">
            Signup
          </button>
          <br />
          <br />
          {message && <p>{message}</p>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
