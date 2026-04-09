import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center gap-2">
        <span>&#128101;</span> Teams
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
          <div className="alert alert-danger m-3">Error loading teams: {error}</div>
        )}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-3">No teams found.</td></tr>
                ) : (
                  teams.map((team, idx) => (
                    <tr key={team.id}>
                      <td className="text-muted">{idx + 1}</td>
                      <td><strong>{team.name}</strong></td>
                      <td className="text-muted">{team.description || <em>No description</em>}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {teams.length} team(s) &mdash; <code>{apiUrl}</code>
      </div>
    </div>
  );
}

export default Teams;
