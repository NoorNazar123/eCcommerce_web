import { Link } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <a href="#" className="hover:text-gray-300">
            MyBrand
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>

          <Link href="/dashboard/analize" className="hover:text-gray-300">
            Analyze
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
