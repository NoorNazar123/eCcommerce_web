import { AppLogo } from './Navbar';
import HamBurgur from './HamBurgur';
import SignInButton from './SignInButton';

const Header = () => {
  return (
    <div className="bg-[#fdf2e9] px-1 sm:px-0 py-4 bg-[#fffffffd] dark:bg-[#000000ea] dark:border-b border-gray-800 shadow-lg font-manrope">
      <div className="md:w-[90%] lg:w-[95%] 2xl:max-w-[1800px] px-2 sm:px-4 md:px-2 mx-auto center-xy justify-between relative">
        {/* Logo Section */}
        <AppLogo />
        <HamBurgur />{' '}
        {/* ✅ Moved interactive component to a client component */}
        <SignInButton />
      </div>
    </div>
  );
};

export default Header;
