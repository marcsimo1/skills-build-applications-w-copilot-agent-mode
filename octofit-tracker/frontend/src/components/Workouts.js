import React, { useEffect, useState } from 'react';

const difficultyClass = (level) => {
  switch ((level || '').toLowerCase()) {
    case 'easy':   return 'badge-difficulty-easy text-white badge';
    case 'medium': return 'badge-difficulty-medium text-white badge';
    case 'hard':   return 'badge-difficulty-hard text-white badge';
    default:       return 'badge bg-secondary';
  }
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Workouts component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setWorkouts(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center gap-2">
        <span>&#127947;</span> Workouts
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
          <div className="alert alert-danger m-3">Error loading workouts: {error}</div>
        )}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted py-3">No workouts found.</td></tr>
                ) : (
                  workouts.map((workout, idx) => (
                    <tr key={workout.id}>
                      <td className="text-muted">{idx + 1}</td>
                      <td><strong>{workout.name}</strong></td>
                      <td className="text-muted">{workout.description || <em>—</em>}</td>
                      <td><span className={difficultyClass(workout.difficulty)}>{workout.difficulty}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {workouts.length} workout(s) &mdash; <code>{apiUrl}</code>
      </div>
    </div>
  );
}

export default Workouts;
