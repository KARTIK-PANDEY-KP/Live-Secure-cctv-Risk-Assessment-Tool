"use client"

import { useState, useEffect } from "react"

export default function UserDashboard() {
  // Add this to your existing state
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [cameras, setCameras] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newCamera, setNewCamera] = useState({
    cameraURL: "",
    position: "",
    customPrompt: "",
    nickname: "",  // Add nickname field
  })

  useEffect(() => {
    fetchCameras()
  }, [])

  const fetchCameras = async () => {
    try {
      const response = await fetch('/api/camera-setup')
      const data = await response.json()
      setCameras(data)
    } catch (error) {
      console.error('Failed to fetch cameras:', error)
    } finally {
      setLoading(false)
    }
  }

  // Update the handleAddCamera function to include nickname
  const handleAddCamera = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      alert('Please accept the terms and conditions')
      return
    }
    try {
      const response = await fetch('/api/camera-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cameraURL: newCamera.cameraURL,
          position: newCamera.position,
          customPrompt: newCamera.customPrompt,
          nickname: newCamera.nickname,  // Add nickname to request
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add camera')
      }

      setShowModal(false)
      setNewCamera({ cameraURL: "", position: "", customPrompt: "" , nickname: ""})
      fetchCameras()
    } catch (error) {
      console.error('Failed to add camera:', error)
    }
  }

  // Add this function after the existing handlers
  const handleDeleteCamera = async (id: number) => {
    try {
      const response = await fetch('/api/camera-setup', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete camera')
      }

      fetchCameras()
    } catch (error) {
      console.error('Failed to delete camera:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Add Camera
          </button>
        </div>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : cameras.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cameras.map((camera: any) => (
              <div key={camera.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {camera.nickname || `Camera ${camera.id}`}
                  </h3>
                  <button
                    onClick={() => handleDeleteCamera(camera.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">URL: {camera.camera_url}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Position: {camera.position}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Prompt: {camera.custom_prompt}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No cameras configured yet. Click "Add Camera" to get started.
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Add New Camera</h2>
              <form onSubmit={handleAddCamera} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Camera URL
                  </label>
                  <input
                    type="text"
                    value={newCamera.cameraURL}
                    onChange={(e) => setNewCamera({ ...newCamera, cameraURL: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Camera Nickname
                  </label>
                  <input
                    type="text"
                    value={newCamera.nickname}
                    onChange={(e) => setNewCamera({ ...newCamera, nickname: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Position
                  </label>
                  <input
                    type="text"
                    value={newCamera.position}
                    onChange={(e) => setNewCamera({ ...newCamera, position: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom Prompt
                  </label>
                  <input
                    type="text"
                    value={newCamera.customPrompt}
                    onChange={(e) => setNewCamera({ ...newCamera, customPrompt: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                      I accept the{' '}
                      <a href="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                        terms and conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                        privacy policy
                      </a>
                    </label>
                  </div>
                </div>
                <div className="flex space-x-2 justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Add Camera
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

