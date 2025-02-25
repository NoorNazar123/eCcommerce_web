import React from 'react';
import Link from 'next/link';
import SignInButton from './SignInButton';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  return (
    <div className="flex bg-[#fdf2e9 ]  justify-between items-center px-6 py-4 bg-[#fffffffd] dark:bg-[#000000ea] dark:border-b border-gray-800 shadow-lg font-manrope">
      <div className="space-x-6 hidden lg:block">
        <Link href="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link href="/dashboard" className="hover:text-gray-300 transition">
          Dashboard
        </Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        <SignInButton />
      </div>
    </div>
  );
};

export default Header;
