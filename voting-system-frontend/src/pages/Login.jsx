import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!user.email || !user.password) {
      alert("Please enter email and password");
      return;
    }

    axios
      .post("http://localhost:8080/api/users/login", user)
      .then((res) => {
        localStorage.setItem("userId", res.data.id);
        navigate("/home");
      })
      .catch(() => {
        alert("Invalid email or password");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-icon">🗳️</div>

          <h1>Welcome Back</h1>

          <p>Login to participate in the election</p>
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
            placeholder="Enter your password"
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
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;