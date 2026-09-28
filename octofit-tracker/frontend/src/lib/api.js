const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiMode = codespaceName ? 'codespaces' : 'local'
export const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
export const apiBaseUrl = `${apiOrigin}/api`

export function collectionUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function readCollection(payload) {
  if (Array.isArray(payload)) {
    return { records: payload, total: payload.length }
  }

  if (!payload || typeof payload !== 'object') {
    return { records: [], total: 0 }
  }

  const nestedData = payload.data && !Array.isArray(payload.data) ? payload.data : null
  const records = [
    payload.results,
    payload.items,
    payload.records,
    payload.data,
    nestedData?.results,
    nestedData?.items,
    nestedData?.records,
  ].find(Array.isArray) ?? []
  const pagination = payload.pagination ?? payload.meta ?? nestedData?.pagination ?? nestedData?.meta
  const total = payload.count ?? payload.total ?? payload.totalCount ?? pagination?.total ?? pagination?.count ?? nestedData?.count ?? records.length

  return {
    records,
    total: Number.isFinite(Number(total)) ? Number(total) : records.length,
  }
}