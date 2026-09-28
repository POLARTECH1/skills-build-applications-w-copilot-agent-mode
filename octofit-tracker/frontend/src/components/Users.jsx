import CollectionPage from './CollectionPage.jsx'
import { useOctoFitCollection } from './useOctoFitCollection.js'

function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'A'
}

export default function Users() {
  const { records, total, loading, error, reload } = useOctoFitCollection('users')

  return (
    <CollectionPage eyebrow="THE PEOPLE BEHIND THE PROGRESS" title="Athletes" description="Meet the people making movement part of their everyday routine." count={total} loading={loading} error={error} reload={reload} emptyTitle="No athlete profiles yet">
      <div className="collection-grid">
        {records.map((user) => (
          <article className="record-card athlete-card" key={user._id}>
            <span className="athlete-initials" aria-hidden="true">{initials(user.name || user.username)}</span>
            <div className="athlete-info">
              <h2>{user.name || user.username || 'OctoFit athlete'}</h2>
              <p>{user.email || 'No email provided'}</p>
              <div className="record-meta user-meta">
                <span>{user.team?.name || 'No team yet'}</span>
                {user.username && <span>@{user.username}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </CollectionPage>
  )
}