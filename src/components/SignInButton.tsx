import { getSession } from '@/lib/session';
import Link from 'next/link';
import { Button } from './ui/button';

const SignInButton = async () => {
  const session = await getSession();

  if (!session || !session.user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/auth/login"
          className=" btn btn-secondary shadow-md boder border-[#0000001a] "
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="btn btn-outline transition rounded-lg shadow-md bg-[#FFD79E] dark:bg-transparent"
        >
          Signup
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Profile Circle */}
      <div className="w-10 h-10 flex items-center text-[1.5rem] justify-center bg-blue-500 text-white font-bold rounded-full">
        {session.user?.username?.toUpperCase().charAt(0)}
      </div>

      <form action="/api/auth/signout" method="GET">
        <Button type="submit" className="btn btn-danger">
          Logout
        </Button>
      </form>
    </div>
  );
};

export default SignInButton;
