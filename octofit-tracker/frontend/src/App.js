import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Workouts from './components/Workouts';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import octofitLogo from './octofitapp-small.png';
import './App.css';

function App() {
  return (
    <div>
      {/* ── Navigation ── */}
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <span className="navbar-brand">
            <img
              src={octofitLogo}
              alt="OctoFit logo"
              className="octofit-navbar-logo"
            />
            OctoFit Tracker
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {[
                { to: '/users',       label: 'Users' },
                { to: '/teams',       label: 'Teams' },
                { to: '/workouts',    label: 'Workouts' },
                { to: '/activities',  label: 'Activities' },
                { to: '/leaderboard', label: 'Leaderboard' },
              ].map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      {/* ── Footer ── */}
      <footer className="text-center text-muted small py-3 border-top">
        &copy; {new Date().getFullYear()} OctoFit Tracker
      </footer>
    </div>
  );
}

export default App;
