import { useState, useEffect } from 'react'
import { Sparkles, Hash } from 'lucide-react'

export default function OptionsPanel({ onChange }) {
  const [tone, setTone] = useState('Professional')
  const [hashtagCount, setHashtagCount] = useState(5)
  const [emojis, setEmojis] = useState(true)

  useEffect(() => {
    onChange({ tone, hashtag_count: hashtagCount, include_emojis: emojis })
  }, [tone, hashtagCount, emojis, onChange])

  return (
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
          <Sparkles size={18} /> Tone
        </div>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Professional</option>
          <option>Insightful</option>
          <option>Bold</option>
        </select>
      </div>

      <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
          <Hash size={18} /> Hashtags
        </div>
        <input
          type="range"
          min={0}
          max={10}
          value={hashtagCount}
          onChange={(e) => setHashtagCount(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">{hashtagCount} tags</div>
      </div>

      <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-between">
        <div className="text-gray-700 font-medium">Include emojis</div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={emojis}
            onChange={(e) => setEmojis(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors relative">
            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all peer-checked:left-6" />
          </div>
        </label>
      </div>
    </div>
  )
}
