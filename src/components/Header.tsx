import React from 'react';
import Link from 'next/link';
import SignInButton from './SignInButton';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-lg">
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link href="/dashboard" className="hover:text-gray-300 transition">
          Dashboard
        </Link>
        <Link href="/profile">Profile</Link>
      </div>
      <SignInButton />
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
