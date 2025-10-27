import { useRef } from 'react'
import { Copy, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function OutputPanel({ result, error, loading }) {
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  const copy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.post)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 rounded-xl border border-red-200 bg-red-50 text-red-800">
        {error}
      </div>
    )
  }

  if (!result && !loading) {
    return null
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
      {result ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-gray-500">Suggested hook</div>
              <div className="font-semibold text-gray-800">{result.hook}</div>
            </div>
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div ref={ref} className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap break-words text-gray-900 leading-relaxed">{result.post}</pre>
          </div>

          <div className="mt-4 text-xs text-gray-500">Generated via {result.used_provider === 'openai' ? 'OpenAI' : 'built-in heuristics'}</div>
        </>
      ) : (
        <div className="text-gray-600">Generating your LinkedIn-ready post…</div>
      )}
    </div>
  )
}
