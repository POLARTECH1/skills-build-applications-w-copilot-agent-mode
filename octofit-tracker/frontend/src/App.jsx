import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import { apiMode } from './lib/api.js'
import Activities from './components/Activities.jsx'
import Dashboard from './components/Dashboard.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', number: '01', end: true },
  { to: '/activities', label: 'Activities', number: '02' },
  { to: '/leaderboard', label: 'Leaderboard', number: '03' },
  { to: '/teams', label: 'Teams', number: '04' },
  { to: '/users', label: 'Athletes', number: '05' },
  { to: '/workouts', label: 'Workouts', number: '06' },
]

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="OctoFit Tracker overview">
          <img src={logo} alt="" />
          <span><strong>OctoFit</strong><small>TRACKER</small></span>
        </Link>

        <p className="sidebar-label">YOUR SPACE</p>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            >
              <span className="nav-number">{item.number}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className={`connection-dot ${apiMode === 'codespaces' ? 'is-online' : 'is-local'}`} />
          <span>{apiMode === 'codespaces' ? 'Codespaces API' : 'Local API'}</span>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <p>MERGINGTON HIGH <span>/</span> MOVEMENT CLUB</p>
          <div className="api-status">
            <span className={`connection-dot ${apiMode === 'codespaces' ? 'is-online' : 'is-local'}`} />
            API {apiMode === 'codespaces' ? 'CODESPACES' : 'LOCAL'}
          </div>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="app-footer">MOVE A LITTLE. GET A LOT BACK.</footer>
      </div>
    </div>
  )
}
