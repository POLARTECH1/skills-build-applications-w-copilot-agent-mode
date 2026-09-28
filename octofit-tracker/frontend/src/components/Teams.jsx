import CollectionPage from './CollectionPage.jsx'
import { useOctoFitCollection } from './useOctoFitCollection.js'

export default function Teams() {
  const { records, total, loading, error, reload } = useOctoFitCollection('teams')

  return (
    <CollectionPage eyebrow="BETTER TOGETHER" title="Teams" description="Find your crew, share a goal, and keep each other showing up." count={total} loading={loading} error={error} reload={reload} emptyTitle="Your first team starts here">
      <div className="collection-grid">
        {records.map((team) => (
          <article className="record-card team-card" key={team._id}>
            <div className="record-topline">
              <h2>{team.name || 'OctoFit team'}</h2>
              <span className="tag">{team.members?.length || 0} athletes</span>
            </div>
            <p>{team.description || 'A team moving toward a shared goal.'}</p>
            {team.members?.length > 0 && (
              <div className="team-members" aria-label="Team members">
                {team.members.map((member) => (
                  <span className="member-chip" key={member._id || member}>{member.name || member.username || 'Athlete'}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </CollectionPage>
  )
}