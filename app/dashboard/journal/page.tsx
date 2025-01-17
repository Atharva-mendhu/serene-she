"use client"

import { useState, useEffect } from "react"
import { HomeButton } from "@/components/home-button"
import { JournalEntryForm } from "./components/journal-entry-form"
import { JournalAnalytics } from "./components/journal-analytics"
import { JournalEntryList } from "./components/journal-entry-list"
import { JournalEntry } from "@/lib/journal-types"

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    // Load entries from localStorage on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('journal_entries')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries))
  }, [entries])

  const addEntry = (entry: JournalEntry) => {
    setEntries(prev => [entry, ...prev])
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <HomeButton />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mood Journal</h1>
        
        {/* New Entry Form */}
        <div className="mb-8">
          <JournalEntryForm onSubmit={addEntry} />
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Journal Analytics</h2>
          <JournalAnalytics entries={entries} />
        </div>

        {/* Entry List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Previous Entries</h2>
          <JournalEntryList entries={entries} />
        </div>
      </div>
    </div>
  )
}

