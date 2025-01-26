import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#003087] sm:text-5xl md:text-6xl">
            Risk Assessment AI Tool
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Evaluate location-based risks efficiently with our advanced assessment platform.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              href="/register"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#003087] hover:bg-[#002670] md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Location Analysis"
            description="Analyze potential risks based on geographical location and historical data."
          />
          <FeatureCard
            title="Real-time Updates"
            description="Receive instant notifications about risk changes in your monitored areas."
          />
          <FeatureCard
            title="Comprehensive Reports"
            description="Generate detailed risk assessment reports for better decision making."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-[#003087]">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

