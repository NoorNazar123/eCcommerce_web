import React from 'react';
import Link from 'next/link';
import SignInButton from './SignInButton';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#ffffff80] dark:bg-[#000000ea] dark:border-b border-gray-700 shadow-lg font-manrope sticky top-0 z-50">
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link href="/dashboard" className="hover:text-gray-300 transition">
          Dashboard
        </Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className="flex gap-4">
        <SignInButton />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
