'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewReport() {
  const router = useRouter()
  const [reportType, setReportType] = useState('url')
  const [rawInput, setRawInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!rawInput.trim()) {
      setError('Please enter something to analyze.')
      return
    }

    setLoading(true)
    setError('')

    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportType, rawInput }),
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error || 'Something went wrong.')
      setLoading(false)
      return
    }

    router.push(`/reports/${data.id}`)
  }

  return (
    <main className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">New report</h1>
        <p className="text-gray-400 mb-8">Submit a suspicious URL, email, or message for analysis.</p>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Report type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="url">URL</option>
              <option value="email">Email</option>
              <option value="message">Message</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              {reportType === 'url' ? 'Paste the suspicious URL' : reportType === 'email' ? 'Paste the email content' : 'Paste the message'}
            </label>
            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              rows={6}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder={reportType === 'url' ? 'https://suspicious-site.xyz/verify' : 'Paste content here...'}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze report'}
          </button>
        </div>
      </div>
    </main>
  )
}
