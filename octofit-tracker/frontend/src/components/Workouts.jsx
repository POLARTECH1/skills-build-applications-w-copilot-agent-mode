import CollectionPage from './CollectionPage.jsx'
import { useOctoFitCollection } from './useOctoFitCollection.js'

export default function Workouts() {
  const { records, total, loading, error, reload } = useOctoFitCollection('workouts')

  return (
    <CollectionPage eyebrow="IDEAS FOR YOUR NEXT SESSION" title="Workouts" description="Choose a session that fits your energy, your experience, and your day." count={total} loading={loading} error={error} reload={reload} emptyTitle="No workouts to suggest yet">
      <div className="collection-grid">
        {records.map((workout) => (
          <article className="record-card workout-card" key={workout._id}>
            <div>
              <div className="record-topline">
                <span className="tag">{workout.activityType || 'Movement'}</span>
                <span className="tag">{workout.difficulty || 'beginner'}</span>
              </div>
              <h2 className="workout-title">{workout.title || 'OctoFit session'}</h2>
              <p>{workout.description || 'A little movement to get you going.'}</p>
            </div>
            <div className="record-bottomline">
              <span className="record-meta">SESSION LENGTH</span>
              <strong>{workout.durationMinutes || 0} min</strong>
            </div>
          </article>
        ))}
      </div>
    </CollectionPage>
  )
}