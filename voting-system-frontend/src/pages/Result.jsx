import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Result() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadResults = () => {
    setLoading(true);

    axios
      .get("http://localhost:8080/api/result")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        alert("Unable to load results");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadResults();
  }, []);

  // Sort candidates by total votes
  const sortedData = [...data].sort(
    (a, b) => b.totalVotes - a.totalVotes
  );

  // Calculate total votes
  const totalVotes = data.reduce(
    (total, candidate) => total + Number(candidate.totalVotes || 0),
    0
  );

  return (
    <div className="result-page">

      {/* Navbar */}
      <nav className="navbar">

        <div className="navbar-brand">
          🗳️ Voting System
        </div>

        <div className="navbar-links">

          <button onClick={() => navigate("/home")}>
            Home
          </button>

          <button onClick={() => navigate("/vote")}>
            Vote
          </button>

          <button
            className="active-nav"
            onClick={() => navigate("/result")}
          >
            Results
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("userId");
              navigate("/login");
            }}
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Main Result Container */}
      <div className="result-container">

        {/* Header */}
        <div className="result-header">

          <span className="result-badge">
            📊 OFFICIAL ELECTION RESULTS
          </span>

          <h1>Election Results</h1>

          <p>
            View the current voting results and candidate performance.
          </p>

        </div>

        {/* Summary */}
        <div className="result-summary">

          <div className="summary-card">
            <div className="summary-icon">👥</div>

            <div>
              <span>Total Candidates</span>
              <strong>{data.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">🗳️</div>

            <div>
              <span>Total Votes</span>
              <strong>{totalVotes}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">🏆</div>

            <div>
              <span>Leading Candidate</span>
              <strong>
                {sortedData.length > 0
                  ? sortedData[0].name
                  : "No votes yet"}
              </strong>
            </div>
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="result-message">
            <div className="result-loader"></div>
            <p>Loading election results...</p>
          </div>
        )}

        {/* No Data */}
        {!loading && data.length === 0 && (
          <div className="result-message">
            <div className="empty-result-icon">📊</div>
            <h2>No Results Available</h2>
            <p>
              Election results will appear here once voting data is available.
            </p>
          </div>
        )}

        {/* Candidate Results */}
        {!loading && sortedData.length > 0 && (
          <div className="result-list">

            {sortedData.map((r, index) => {

              const votes = Number(r.totalVotes || 0);

              const percentage =
                totalVotes > 0
                  ? ((votes / totalVotes) * 100).toFixed(1)
                  : "0.0";

              return (
                <div
                  className={`professional-result-card ${
                    index === 0 ? "top-result" : ""
                  }`}
                  key={r.id}
                >

                  {/* Rank */}
                  <div className="result-rank">

                    {index === 0 ? (
                      <span className="rank-trophy">🏆</span>
                    ) : (
                      <span className="rank-number">
                        #{index + 1}
                      </span>
                    )}

                  </div>

                  {/* Avatar */}
                  <div className="result-avatar">
                    {r.name
                      ? r.name.charAt(0).toUpperCase()
                      : "C"}
                  </div>

                  {/* Candidate Info */}
                  <div className="result-candidate-info">

                    <div className="result-name-row">

                      <h2>{r.name}</h2>

                      {index === 0 && (
                        <span className="leading-badge">
                          Leading
                        </span>
                      )}

                    </div>

                    <p className="result-party">
                      🏛️ {r.party}
                    </p>

                    <p className="result-position">
                      <span>Position</span>
                      <strong>{r.position}</strong>
                    </p>

                    {/* Progress Bar */}
                    <div className="vote-progress-area">

                      <div className="vote-progress-header">
                        <span>Vote Share</span>
                        <strong>{percentage}%</strong>
                      </div>

                      <div className="vote-progress">
                        <div
                          className="vote-progress-fill"
                          style={{
                            width: `${percentage}%`
                          }}
                        ></div>
                      </div>

                    </div>

                  </div>

                  {/* Vote Count */}
                  <div className="professional-vote-count">

                    <span>{votes}</span>

                    <small>
                      {votes === 1 ? "Vote" : "Votes"}
                    </small>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Refresh */}
        {!loading && data.length > 0 && (
          <div className="result-actions">

            <button
              className="refresh-result-button"
              onClick={loadResults}
            >
              🔄 Refresh Results
            </button>

            <button
              className="back-vote-button"
              onClick={() => navigate("/vote")}
            >
              🗳️ Go to Voting
            </button>

          </div>
        )}

        <div className="result-footer">
          <p>
            © 2026 Voting System • Official Election Results
          </p>
        </div>

      </div>
    </div>
  );
}

export default Result;