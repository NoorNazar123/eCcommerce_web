// 'use client';

import Link from 'next/link';
import { navLinkData, NavLinks } from '@/data/header.data';
import SignInButton from './SignInButton';

export const AppLogo = () => {
  return (
    <div className="center-xy cursor-pointer">
      <span className="heading-h4 sm:heading-h3 text-[22px] leading-[35px] md:leading-[55px] font-black italic tracking-wide font-logo bg-gradient-to-r from-[#FEB47B] dark:to-white to-[#333] bg-clip-text text-transparent">
        Trendy
      </span>
      <span className="heading-h4 sm:heading-h3 text-[22px] font-black dark:text-white text-[#333] italic tracking-wide transform transition-all duration-300 font-logo">
        Threads
      </span>
    </div>
  );
};

export const NavLink = ({
  navlinkData,
  ulStyle,
}: {
  navlinkData: NavLinks[];
  ulStyle?: string;
}) => {
  return (
    <>
      <ul className={`center-xy gap-4 ${ulStyle}`}>
        {navlinkData.length > 0
          ? navlinkData.map((data) => (
              <li key={data.id}>
                <Link
                  href={data.path}
                  className={`hover:text-[#FFD79E] dark:hover:text-gray-300 para transition ${data.liStyle}`}
                >
                  {data.name}
                </Link>
              </li>
            ))
          : 'navlink not found'}
      </ul>
      {/* ✅ Moved interactive component to a client component */}
      {/* <SignInButton /> */}
    </>
  );
};
