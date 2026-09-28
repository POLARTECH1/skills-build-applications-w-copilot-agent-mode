import { useEffect, useState } from 'react'
import { collectionUrl, readCollection } from '../lib/api.js'

export function useOctoFitCollection(resource) {
  const [attempt, setAttempt] = useState(0)
  const [collection, setCollection] = useState({ records: [], total: 0, loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setCollection((current) => ({ ...current, loading: true, error: '' }))

      try {
        const response = await fetch(collectionUrl(resource), { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const { records, total } = readCollection(await response.json())
        setCollection({ records, total, loading: false, error: '' })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setCollection((current) => ({
            ...current,
            loading: false,
            error: error.message || 'Could not load data from the API.',
          }))
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [attempt, resource])

  return { ...collection, reload: () => setAttempt((current) => current + 1) }
}