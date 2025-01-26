'use client'

import React, { useState } from 'react'
import RiskMeter from '@/components/RiskMeter'
import Map from '@/components/Map'

// --- Type Definitions ---
interface SearchResult {
  id: number
  address: string
  risk: string
  occurrences?: number
  latitude?: number
  longitude?: number
}

type RiskCategory = 'Masks' | 'Collisions' | 'Fence Boundaries' | 'Fence Crossings'

// --- Constants ---
const RISK_CATEGORIES: Record<RiskCategory, number> = {
  'Masks': 9,
  'Collisions': 6,
  'Fence Boundaries': 3,
  'Fence Crossings': 8
}

// --- Helper Functions ---
const calculateRiskLevel = (score: number): string => {
  if (score >= 8) return 'High'
  if (score >= 5) return 'Medium'
  return 'Low'
}

// --- Main Component ---
export default function Search() {
  const [searchParams, setSearchParams] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    radius: "",
    customPrompt: "",
  })

  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 1) Prepare the address
    const address = `${searchParams.streetAddress}, ${searchParams.city}, ${searchParams.state} ${searchParams.zipCode}`

    // 2) Determine risk based on custom prompt
    const prompt = searchParams.customPrompt.trim()
    const matchedCategory = Object.keys(RISK_CATEGORIES).find(
      (cat) => cat.toLowerCase() === prompt.toLowerCase()
    ) as RiskCategory | undefined
    
    const riskScore = matchedCategory ? RISK_CATEGORIES[matchedCategory] : 5
    const riskLevel = calculateRiskLevel(riskScore)

    try {
      // 3) Geocode the address using Radar
      const response = await fetch(
        `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(address)}`,
        {
          headers: {
            'Authorization': 'prj_live_pk_d7406e978bf540701796d188b5ff83f8dd625560',
          },
        }
      )

      const data = await response.json()

      if (data && data.addresses && data.addresses.length > 0) {
        const { latitude, longitude } = data.addresses[0]

        // Simulate API delay (optional)
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mock results (you can replace this with your real API data)
        const mockResults: SearchResult[] = [
          {
            id: 1,
            address,
            risk: riskLevel,
            occurrences: Math.floor(Math.random() * 20) + 1,
            latitude,
            longitude,
          },
        ]

        setSearchResults(mockResults)
      }
    } catch (error) {
      console.error('Geocoding error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:mx-auto container">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-2xl sm:p-20">
          <div className="flex gap-8">
            {/* --- Search Form --- */}
            <div className="flex-1 max-w-md">
              <h1 className="text-2xl font-semibold mb-6 text-[#003087]">Location Search</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Street Address */}
                <div>
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    value={searchParams.streetAddress}
                    onChange={(e) => setSearchParams({ ...searchParams, streetAddress: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-50"
                    required
                  />
                </div>

                {/* City / State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={searchParams.city}
                      onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={searchParams.state}
                      onChange={(e) => setSearchParams({ ...searchParams, state: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-50"
                      required
                    />
                  </div>
                </div>

                {/* ZIP / Radius */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={searchParams.zipCode}
                      onChange={(e) => setSearchParams({ ...searchParams, zipCode: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="radius" className="block text-sm font-medium text-gray-700">
                      Radius (mi)
                    </label>
                    <input
                      type="number"
                      id="radius"
                      value={searchParams.radius}
                      onChange={(e) => setSearchParams({ ...searchParams, radius: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-50"
                      required
                    />
                  </div>
                </div>

                {/* Custom Prompt */}
                <div>
                  <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-700">
                    Custom Prompt
                  </label>
                  <textarea
                    id="customPrompt"
                    value={searchParams.customPrompt}
                    onChange={(e) => setSearchParams({ ...searchParams, customPrompt: e.target.value })}
                    placeholder="Available categories: Masks, Collisions, Fence Boundaries, Fence Crossings"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-50"
                    rows={2}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#003087] hover:bg-[#002670] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003087]"
                >
                  Search
                </button>
              </form>
            </div>

            {/* --- Search Results --- */}
            <div className="flex-1 border-l border-gray-200 pl-8">
              <h2 className="text-xl font-semibold mb-4 text-[#003087]">
                {isLoading ? 'Searching...' : searchResults.length > 0 ? 'Search Results' : 'No results yet'}
              </h2>

              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003087]"></div>
                </div>
              ) : (
                searchResults.length > 0 && (
                  <>
                    <ul className="space-y-2">
                      {searchResults.map((result: SearchResult) => (
                        <li key={result.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                          <p className="font-medium text-[#003087]">{result.address}</p>
                          <p className="text-sm text-gray-600">Risk Level: {result.risk}</p>
                          <RiskMeter risk={result.risk} />

                          {result.latitude && result.longitude && (
                            <div className="mt-4">
                              <Map
                                address={result.address}
                                latitude={result.latitude}
                                longitude={result.longitude}
                                radius={Number(searchParams.radius)}
                              />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* --- Report Summary --- */}
                    {searchParams.customPrompt && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-semibold text-[#003087]">Report Summary</h3>
                          <button
                            onClick={() => {
                              const report = {
                                address: searchResults[0]?.address,
                                risk: searchResults[0]?.risk,
                                occurrences: searchResults[0]?.occurrences,
                                timestamp: new Date().toISOString(),
                              }
                              const blob = new Blob([JSON.stringify(report, null, 2)], {
                                type: 'application/json',
                              })
                              const url = URL.createObjectURL(blob)
                              const a = document.createElement('a')
                              a.href = url
                              a.download = 'risk-assessment-report.json'
                              document.body.appendChild(a)
                              a.click()
                              document.body.removeChild(a)
                              URL.revokeObjectURL(url)
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-[#003087] hover:bg-[#002670] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003087]"
                          >
                            Download Report
                          </button>
                        </div>

                        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-[#003087]">Custom Prompt:</span>{' '}
                            {searchParams.customPrompt}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium text-[#003087]">Risk Level:</span>{' '}
                            {searchResults[0]?.risk}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium text-[#003087]">Occurrences (Last 30 days):</span>{' '}
                            {searchResults[0]?.occurrences}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
