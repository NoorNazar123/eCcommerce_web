import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = () => (
  <Link
    href="http://localhost:8080/auth/google/login"
    className="w-full btn btn-outline rounded-lg shadow-md py-[18px] my-4 flex items-centen justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <FcGoogle className="text-3xl" />
    <span className="para text-[18px] font-semibold md:text-[20px] px-2">
      Continue With Google
    </span>
  </Link>
);

export default GoogleLoginButton;
