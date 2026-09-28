export default function CollectionPage({
  eyebrow,
  title,
  description,
  count,
  loading,
  error,
  reload,
  emptyTitle,
  children,
}) {
  return (
    <section aria-labelledby="collection-title">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title" id="collection-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="collection-count" aria-live="polite">
          <strong>{loading ? '...' : count}</strong>
          <span>{count === 1 ? 'record' : 'records'}</span>
        </div>
      </div>

      {loading && <div className="collection-state" role="status">Loading {title.toLowerCase()}...</div>}
      {!loading && error && (
        <div className="collection-state" role="alert">
          <h2>We could not reach the API</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={reload} type="button">Try again</button>
        </div>
      )}
      {!loading && !error && count === 0 && (
        <div className="collection-state">
          <h2>{emptyTitle}</h2>
          <p>There is nothing here yet. New records will show up as soon as they are added.</p>
        </div>
      )}
      {!loading && !error && count > 0 && children}
    </section>
  )
}