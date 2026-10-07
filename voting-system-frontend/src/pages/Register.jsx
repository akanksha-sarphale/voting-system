import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!user.name || !user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }

    axios
      .post("http://localhost:8080/api/users/register", user)
      .then(() => {
        alert("Registration successful! Please login.");
        navigate("/login");
      })
      .catch(() => {
        alert("Registration failed. Email may already exist.");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-icon">🗳️</div>

          <h1>Create Account</h1>

          <p>Register to participate in the election</p>
        </div>

        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value
              })
            }
          />
        </div>

        <button
          className="auth-button"
          onClick={handleRegister}
        >
          Create Account
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;