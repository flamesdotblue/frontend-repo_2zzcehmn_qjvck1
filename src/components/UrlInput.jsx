import { useState } from 'react'
import { LinkIcon } from 'lucide-react'

export default function UrlInput({ onSubmit, loading }) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!url) return
    onSubmit(url)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-2">Paste a news, blog, or article link</label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <LinkIcon size={18} />
          </span>
          <input
            type="url"
            required
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
      </div>
    </form>
  )
}
