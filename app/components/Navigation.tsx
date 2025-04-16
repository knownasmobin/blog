import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Your Name
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/#about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/#experience" className="text-gray-600 hover:text-gray-900">
              Experience
            </Link>
            <Link href="/#skills" className="text-gray-600 hover:text-gray-900">
              Skills
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 