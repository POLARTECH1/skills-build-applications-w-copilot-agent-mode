import CollectionPage from './CollectionPage.jsx'
import { useOctoFitCollection } from './useOctoFitCollection.js'

export default function Leaderboard() {
  const { records, total, loading, error, reload } = useOctoFitCollection('leaderboard')

  return (
    <CollectionPage eyebrow="FRIENDLY COMPETITION" title="Leaderboard" description="Celebrate consistency, personal bests, and the effort behind every point." count={total} loading={loading} error={error} reload={reload} emptyTitle="The leaderboard is ready">
      <div className="leaderboard-list">
        {records.map((entry, index) => (
          <article className="leaderboard-row" key={entry._id || entry.user?._id || index}>
            <span className="rank-number" aria-label={`Rank ${index + 1}`}>{index + 1}</span>
            <div className="athlete-info">
              <h2>{entry.user?.name || entry.username || 'Club athlete'}</h2>
              <p>{entry.user?.team?.name || 'OctoFit athlete'}</p>
            </div>
            <div className="leaderboard-score"><strong>{entry.points ?? 0}</strong>points</div>
          </article>
        ))}
      </div>
    </CollectionPage>
  )
}