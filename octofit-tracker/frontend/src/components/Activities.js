import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center gap-2">
        <span>&#128293;</span> Activities
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
          <div className="alert alert-danger m-3">Error loading activities: {error}</div>
        )}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Workout</th>
                  <th>Date</th>
                  <th>Duration (min)</th>
                  <th>Calories Burned</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr><td colSpan="6" className="text-center text-muted py-3">No activities found.</td></tr>
                ) : (
                  activities.map((activity, idx) => (
                    <tr key={activity.id}>
                      <td className="text-muted">{idx + 1}</td>
                      <td><strong>{activity.user}</strong></td>
                      <td>{activity.workout}</td>
                      <td>{activity.date ? new Date(activity.date).toLocaleDateString() : <em>—</em>}</td>
                      <td><span className="badge bg-info text-dark">{activity.duration_minutes} min</span></td>
                      <td><span className="badge bg-warning text-dark">{activity.calories_burned} kcal</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {activities.length} activit{activities.length === 1 ? 'y' : 'ies'} &mdash; <code>{apiUrl}</code>
      </div>
    </div>
  );
}

export default Activities;
