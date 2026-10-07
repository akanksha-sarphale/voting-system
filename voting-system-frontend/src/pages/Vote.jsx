import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/candidates")
      .then((res) => setCandidates(res.data))
      .catch(() => alert("Unable to load candidates"));
  }, []);

  const vote = (id) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  axios
    .post(
      `http://localhost:8080/api/vote?userId=${userId}&candidateId=${id}`
    )
    .then((res) => {
      // Backend response check
      if (res.data === "You have already voted!") {
        alert("You have already voted!");
        return;
      }

      if (res.data === "User not found!") {
        alert("User not found!");
        return;
      }

      if (res.data === "Vote Cast Successfully!") {
        const candidate = candidates.find((c) => c.id === id);

        setSelectedCandidate(candidate);
        setVoted(true);
        return;
      }

      alert(res.data);
    })
    .catch((error) => {
      console.log(error);
      alert("Vote failed. Please try again.");
    });
};

  /* =========================
     VOTE SUCCESS
  ========================= */

  if (voted) {
    return (
      <div className="vote-page">

        <nav className="navbar">
          <div className="navbar-brand">
            🗳️ Voting System
          </div>

          <div className="navbar-links">
            <button onClick={() => navigate("/vote")}>
              Vote
            </button>

            <button onClick={() => navigate("/result")}>
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

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h1>Vote Cast Successfully!</h1>

          <p>
            Your vote has been recorded successfully.
          </p>

          {selectedCandidate && (
            <div className="selected-candidate">
              <h3>Your Selected Candidate</h3>

              <h2>{selectedCandidate.name}</h2>

              <p>
                <strong>Party:</strong>{" "}
                {selectedCandidate.party}
              </p>

              <p>
                <strong>Position:</strong>{" "}
                {selectedCandidate.position}
              </p>
            </div>
          )}

          <button
            className="result-button"
            onClick={() => navigate("/result")}
          >
            View Results →
          </button>

        </div>
      </div>
    );
  }

  /* =========================
     VOTE PAGE
  ========================= */

  return (
    <div className="vote-page">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="navbar-brand">
          🗳️ Voting System
        </div>

        <div className="navbar-links">

          <button
            className="active-nav"
            onClick={() => navigate("/vote")}
          >
            Vote
          </button>

          <button
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

      {/* HEADER */}

      <div className="vote-container">

        <div className="vote-heading">

          <span className="vote-badge">
            🗳️ CAST YOUR VOTE
          </span>

          <h1>
            Choose Your Candidate
          </h1>

          <p className="vote-subtitle">
            Review the candidates carefully and select
            one candidate to cast your vote.
          </p>

        </div>

        {/* CANDIDATES */}

        <div className="candidate-list">

          {candidates.length === 0 ? (

            <div className="no-candidates">
              <div>📋</div>

              <h2>
                No Candidates Available
              </h2>

              <p>
                Candidates will appear here once they are
                added to the election.
              </p>
            </div>

          ) : (

            candidates.map((c, index) => (

              <div
                className="candidate-card"
                key={c.id}
              >

                {/* Candidate Number */}

                <div className="candidate-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Avatar */}

                <div className="candidate-avatar">
                  {c.name
                    ? c.name.charAt(0).toUpperCase()
                    : "C"}
                </div>

                {/* Candidate Info */}

                <div className="candidate-content">

                  <h2>
                    {c.name}
                  </h2>

                  <div className="candidate-party">
                    🏛️ {c.party}
                  </div>

                  <div className="candidate-position">
                    <span>
                      Position
                    </span>

                    <strong>
                      {c.position}
                    </strong>
                  </div>

                </div>

                {/* Vote Button */}

                <button
                  className="vote-button"
                  onClick={() => vote(c.id)}
                >
                  🗳️ Vote for {c.name}
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Vote;