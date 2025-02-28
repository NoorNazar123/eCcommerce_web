import { getSession } from '@/lib/session';
import Link from 'next/link';
import { Button } from './ui/button';
import { FaRegUserCircle } from 'react-icons/fa';

import { RiLogoutCircleRLine } from 'react-icons/ri';
import LogoutButton from './LogoutButton';
import { ModeToggle } from './ModeToggle';

const SignInButton = async () => {
  const session = await getSession();

  if (!session || !session.user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/auth/login"
          className=" btn btn-secondary  shadow-md boder border-[#0000001a] "
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="btn btn-outline transition rounded-lg shadow-md p-[20px]  hover:bg-[#FFD79E]  dark:bg-transparent"
        >
          Signup
        </Link>
      </div>
    );
  }

  return (
    <div className="center-xy gap-3">
      {/* <form action="/api/auth/signout" method="GET">
        <Button
          type="submit"
          className="btn-outline text-black py-[21px] px-[14px]  hover:bg-[#ff2727] dark:hover:bg-[#ff2727]"
        >
          <RiLogoutCircleRLine />
        </Button>
      </form> */}
      {/* <ModeToggle /> */}
      {session.user?.username && session.user.username.trim().length > 0 ? (
        <div className="w-10 h-10 p-[1.1rem] center-xy text-[1.2rem] shadow-md border border-gray-300 dark:border-gray-600 rounded-full text-gray-800 dark:text-[#fff] hover:bg-[#FEB47B] dark:bg-transparent dark:hover:bg-[#1f2937] cursor-pointer">
          <p>{session.user.username.charAt(0).toUpperCase()}</p>
        </div>
      ) : (
        <div className="btn-outline p-[13px] rounded-full">
          <FaRegUserCircle />
        </div>
      )}

      <LogoutButton />
    </div>
  );
};

export default SignInButton;
