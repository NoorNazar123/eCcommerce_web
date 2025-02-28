'use client'; // ✅ Marks this as a client component

import { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { TiShoppingCart } from 'react-icons/ti';
import { navLinkData, NavLinks } from '@/data/header.data';
import { NavLink } from './Navbar';

const HamBurgur = () => {
  const [navlinkToggle, setNavlinkToggle] = useState(false);

  return (
    <div>
      {/* Navlink Section */}
      <div
        className={` w-full 
         ${navlinkToggle ? 'absolute left-0 top-[100%]' : 'hidden'} 
         lg:relative lg:flex lg:top-0 lg:left-auto`}
      >
        <NavLink
          navlinkData={navLinkData}
          ulStyle={`${navlinkToggle ? 'flex-col w-full' : 'flex-row'} lg:flex-row`}
        />

        {/* Icons & Buttons*/}
        <div className="center-xy">
          <ModeToggle />
          <Link
            href="#"
            className="inline-block transition hover:text-[#FEB47B] dark:hover:text-gray-300"
          >
            <TiShoppingCart className="text-[35px]" />
          </Link>
        </div>
      </div>

      {/* Hamburger Button */}
      <div
        onClick={() => setNavlinkToggle((prev) => !prev)}
        className="lg:hidden"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-[43px] h-[5px] bg-gray-700 dark:bg-transparent my-[6px] rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HamBurgur;
