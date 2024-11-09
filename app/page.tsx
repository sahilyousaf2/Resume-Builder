import Link from 'next/link'
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Welcome to CV Builder
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
            Create Your Professional Resume in Minutes
          </h2>
          <p className="text-gray-400 max-w-2xl mb-12 text-sm md:text-base">
            Build a stunning, professional CV that sets you apart from other candidates.
            Our easy-to-use builder helps you create a personalized resume that highlights
            your unique skills and experiences.
          </p>

          <div className="space-x-4">
            <Link
              href="/create-cv"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 inline-block"
            >
              Get Started
            </Link>

          </div>

          <div className="mt-16 grid grid-cols-1  gap-8 text-center">
            <div className="p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-200">
              <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
              <p className="text-gray-400">Intuitive interface that guides you through every step</p>
            </div>
          </div>

          <footer className="mt-16 text-gray-400 text-sm">
            Created by Sahil Yousaf | &copy; {new Date().getFullYear()} All rights reserved
          </footer>
        </div>
      </div>
    </main>
  )
}
