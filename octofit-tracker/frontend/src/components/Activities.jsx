import CollectionPage from './CollectionPage.jsx'
import { useOctoFitCollection } from './useOctoFitCollection.js'

function formatDate(value) {
  if (!value) return 'Date not set'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Date not set'
    : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export default function Activities() {
  const { records, total, loading, error, reload } = useOctoFitCollection('activities')

  return (
    <CollectionPage eyebrow="THE MOVEMENT LOG" title="Activities" description="Every lap, lift, and long walk adds up. Here is what the club has been moving through." count={total} loading={loading} error={error} reload={reload} emptyTitle="No activities logged yet">
      <div className="collection-grid">
        {records.map((activity) => (
          <article className="record-card activity-card" key={activity._id}>
            <span className="activity-mark" aria-hidden="true">{activity.type?.slice(0, 1).toUpperCase() || 'A'}</span>
            <div>
              <h2>{activity.user?.name || 'Club athlete'}</h2>
              <div className="activity-type">{activity.type || 'Activity'} · {formatDate(activity.completedAt)}</div>
              <div className="record-meta activity-submeta">
                <span><strong>{activity.durationMinutes || 0}</strong> min</span>
                {activity.distanceKm > 0 && <span><strong>{activity.distanceKm}</strong> km</span>}
              </div>
            </div>
            <div className="activity-points"><strong>{activity.points || 0}</strong>pts</div>
          </article>
        ))}
      </div>
    </CollectionPage>
  )
}