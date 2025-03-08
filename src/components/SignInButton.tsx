import { getSession } from '@/lib/session';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import LogoutButton from './LogoutButton';

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
          className="btn btn-outline transition px-[22px] rounded-lg shadow-md hover:bg-[#FFD79E]  dark:bg-transparent"
        >
          Signup
        </Link>
      </div>
    );
  }

  return (
    <div className="center-xy gap-3">
    
      {/* <ModeToggle /> */}
      {session.user?.username && session.user.username.trim().length > 0 ? (
        <div className="w-12 h-12 p-[1.1rem] center-xy text-[1.2rem] shadow-md border border-gray-300 dark:border-gray-600 rounded-full text-gray-800 dark:text-[#fff] hover:bg-[#FEB47B] dark:bg-transparent dark:hover:bg-[#1f2937] cursor-pointer">
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
