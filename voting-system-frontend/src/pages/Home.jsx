import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          🗳️ Voting System
        </div>

        <div className="navbar-links">
          <button
            className="active-nav"
            onClick={() => navigate("/home")}
          >
            Home
          </button>

          <button onClick={() => navigate("/vote")}>
            Vote
          </button>

          <button onClick={() => navigate("/result")}>
            Results
          </button>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="home-container">

        <div className="home-hero">
          <div className="home-icon">🗳️</div>

          <span className="home-badge">
            ONLINE ELECTION PORTAL
          </span>

          <h1>
            Welcome to the <span>Voting System</span>
          </h1>

          <p>
            Participate in the election and make your voice heard.
            Select your candidate and cast your vote securely.
          </p>

          <button
            className="home-vote-button"
            onClick={() => navigate("/vote")}
          >
            🗳️ Cast Your Vote
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div className="dashboard-card-icon">🗳️</div>
            <h2>Cast Your Vote</h2>
            <p>
              View the available candidates and select one candidate
              to participate in the election.
            </p>

            <button onClick={() => navigate("/vote")}>
              View Candidates →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">📊</div>
            <h2>Election Results</h2>
            <p>
              View the current voting results and see the total votes
              received by each candidate.
            </p>

            <button onClick={() => navigate("/result")}>
              View Results →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">🔐</div>
            <h2>Secure Voting</h2>
            <p>
              Your vote is recorded through the voting system and
              linked to your registered account.
            </p>

            <button onClick={() => navigate("/vote")}>
              Start Voting →
            </button>
          </div>

        </div>

        <div className="home-footer">
          <p>© 2026 Voting System • Secure • Simple • Transparent</p>
        </div>

      </div>
    </div>
  );
}

export default Home;