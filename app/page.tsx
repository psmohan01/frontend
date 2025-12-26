import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 p-8 sm:p-24 text-gray-900">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="relative rounded-full bg-white p-2 shadow-xl"
            priority
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Welcome to <span className="text-blue-600">My App</span>
        </h1>
        
        <p className="max-w-md text-lg text-gray-600">
          A sleek, modern Next.js starter template with Tailwind CSS styling.
        </p>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mt-8">
          <Link 
            href="/career" 
            className="flex items-center justify-center px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all group"
          >
            <span className="font-semibold text-gray-700 group-hover:text-blue-600">Career</span>
          </Link>

          <Link 
            href="/contact" 
            className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-200 transition-all"
          >
            <span className="font-semibold">Contact</span>
          </Link>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-20 text-sm text-gray-400">
        © 2025 Your Brand. Built with Next.js.
      </footer>
    </main>
  );
}