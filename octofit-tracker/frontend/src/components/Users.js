import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Users component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center gap-2">
        <span>&#128100;</span> Users
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
          <div className="alert alert-danger m-3">Error loading users: {error}</div>
        )}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>Leader</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted py-3">No users found.</td></tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={user.id}>
                      <td className="text-muted">{idx + 1}</td>
                      <td><strong>{user.name}</strong></td>
                      <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                      <td><span className="badge bg-secondary">{user.team}</span></td>
                      <td>
                        {user.is_leader
                          ? <span className="badge bg-success">Leader</span>
                          : <span className="badge bg-light text-dark">Member</span>}
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
        {users.length} user(s) &mdash; <code>{apiUrl}</code>
      </div>
    </div>
  );
}

export default Users;
