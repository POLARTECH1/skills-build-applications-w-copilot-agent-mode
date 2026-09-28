import { Link } from 'react-router-dom'
import { useOctoFitCollection } from './useOctoFitCollection.js'

function OverviewStat({ label, value }) {
  return (
    <div className="stat-item">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
    </div>
  )
}

export default function Dashboard() {
  const users = useOctoFitCollection('users')
  const teams = useOctoFitCollection('teams')
  const activities = useOctoFitCollection('activities')
  const workouts = useOctoFitCollection('workouts')

  return (
    <section aria-labelledby="overview-title">
      <div className="dashboard-hero">
        <p className="eyebrow">YOUR WEEK, IN MOTION</p>
        <h1 className="dashboard-title" id="overview-title">Small steps.<br />Strong momentum.</h1>
        <p>Every walk, workout, and team effort moves the whole club forward.</p>
        <Link className="hero-link" to="/activities">Explore activity <span aria-hidden="true">-&gt;</span></Link>
      </div>

      <div className="stats-strip" aria-label="Club overview">
        <OverviewStat label="ATHLETES" value={users.loading ? '...' : users.total} />
        <OverviewStat label="TEAMS" value={teams.loading ? '...' : teams.total} />
        <OverviewStat label="ACTIVITIES" value={activities.loading ? '...' : activities.total} />
        <OverviewStat label="WORKOUTS" value={workouts.loading ? '...' : workouts.total} />
      </div>

      <div className="dashboard-section-heading">
        <div>
          <p className="eyebrow">FRESH FROM THE CLUB</p>
          <h2>Recent activity</h2>
        </div>
        <Link className="text-link" to="/activities">All activity</Link>
      </div>

      {activities.loading && <div className="overview-empty" role="status">Loading recent activity...</div>}
      {!activities.loading && activities.error && <div className="overview-empty" role="alert">{activities.error}</div>}
      {!activities.loading && !activities.error && activities.records.length === 0 && (
        <div className="overview-empty">The first activity is waiting to be logged.</div>
      )}
      {!activities.loading && !activities.error && activities.records.length > 0 && (
        <div className="dashboard-activity-list">
          {activities.records.slice(0, 4).map((activity) => (
            <article className="dashboard-activity" key={activity._id}>
              <span className="activity-mark" aria-hidden="true">{activity.type?.slice(0, 1).toUpperCase() || 'A'}</span>
              <div>
                <h3>{activity.user?.name || 'Club athlete'} - {activity.type || 'Activity'}</h3>
                <p>{activity.durationMinutes || 0} minutes</p>
              </div>
              <strong>{activity.points || 0} pts</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}