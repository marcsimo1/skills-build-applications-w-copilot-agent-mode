import React, { useEffect, useState } from 'react';

const rankMedal = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setEntries(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <>
      {/* Hero banner */}
      <div className="octofit-hero">
        <h1>&#127942; OctoFit Leaderboard</h1>
        <p>Track your team's fitness progress and compete for the top spot!</p>
      </div>

      <div className="card octofit-card">
        <div className="card-header d-flex align-items-center gap-2">
          <span>&#127942;</span> Leaderboard
        </div>
        <div className="card-body p-0">
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading…</span>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-danger m-3">Error loading leaderboard: {error}</div>
          )}
          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length === 0 ? (
                    <tr><td colSpan="3" className="text-center text-muted py-3">No leaderboard entries found.</td></tr>
                  ) : (
                    entries.map((entry) => (
                      <tr key={entry.id} className={entry.rank === 1 ? 'table-warning' : ''}>
                        <td className="fw-bold fs-5">{rankMedal(entry.rank)}</td>
                        <td><strong>{entry.team}</strong></td>
                        <td>
                          <span className="badge bg-primary fs-6">{entry.total_points} pts</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted small">
          {entries.length} team(s) ranked &mdash; <code>{apiUrl}</code>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
