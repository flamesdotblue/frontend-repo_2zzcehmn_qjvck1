import { useCallback, useState } from 'react'
import UrlInput from './components/UrlInput'
import OptionsPanel from './components/OptionsPanel'
import OutputPanel from './components/OutputPanel'
import Loader from './components/Loader'
import { Rocket } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [options, setOptions] = useState({ tone: 'Professional', hashtag_count: 5, include_emojis: true })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const analyze = useCallback(async (url) => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${API_BASE}/api/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, ...options })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Failed to generate summary')
      }
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [options])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Rocket size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Link→LinkedIn</h1>
            <p className="text-sm text-gray-600">Turn any article into a polished LinkedIn post in seconds</p>
          </div>
        </div>
      </header>

      <main className="px-6 pb-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <UrlInput onSubmit={analyze} loading={loading} />
          <OptionsPanel onChange={setOptions} />
          {loading && <Loader />}
          <OutputPanel result={result} error={error} loading={loading} />
        </div>
      </main>

      <footer className="px-6 py-10 border-t bg-white/60 backdrop-blur">
        <div className="max-w-5xl mx-auto text-sm text-gray-600 flex items-center justify-between">
          <div>Tips: Works best with article pages. For paywalled content, try sharing a public link or summary page.</div>
          <div className="text-gray-500">Made for creators</div>
        </div>
      </footer>
    </div>
  )
}

export default App
