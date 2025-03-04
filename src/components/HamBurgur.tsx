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
         ${navlinkToggle ? 'absolute left-0 top-[100%] text-white mt-4 bg-[#000000c7] dark:bg-[#000000f1] h-[60vh] center-xy flex-col lg:flex-row ' : 'hidden'} 
         lg:relative lg:flex lg:top-0 lg:left-auto lg:h-[6vh]  lg:bg-transparent lg:text-black dark:text-white duration-150`}
      >
        <NavLink
          navlinkData={navLinkData}
          ulStyle={`${navlinkToggle ? 'flex-col w-full' : 'flex-row'} lg:flex-row mr-[2rem]`}
        />

        {/* Icons & Buttons*/}
        <div className="center-xy">
          <Link
            href="#"
            className="inline-block transition hover:text-[#FEB47B] dark:hover:text-gray-300"
          >
            <TiShoppingCart className="text-[35px]" />
          </Link>
          <ModeToggle />
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
            className="w-[43px] h-[5px] bg-gray-700 dark:bg-white my-[6px] rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HamBurgur;
