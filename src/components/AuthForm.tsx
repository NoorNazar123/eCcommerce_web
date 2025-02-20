'use client';

import React, { useEffect, useState } from 'react';
import LoginForm from '@/app/(root)/auth/login/loginForm';
import SignupForm from '@/app/(root)/auth/signup/signupForm';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GoogleLoginButton from './GoogleLoginButton';
import { useTheme } from 'next-themes';

const AuthForm = ({ type }: { type: 'login' | 'signup' }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration issues

  // Determine the image source based on the resolved theme
  const imageSrc =
    resolvedTheme === 'dark' ? '/images/darkAuth.gif' : '/images/lightAuth.gif';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="layout-container md:pt-[3rem] lg:flex items-center justify-between"
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className=" md:flex md:w-[100%] lg:w-[54%] xl:w-[55%] 2xl:w-[50%]"
        >
          <Image
            src={imageSrc}
            alt="Auth Image"
            width={700}
            height={400}
            className="w-full h-full object-cover "
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:w-[100%] lg:w-[45%] xl:w-[45%] 2xl:w-[40%] shadow-md px-3 py-2 md:py-2 md:px-5 rounded-lg dark:border border-gray-800"
        >
          <h2 className="heading-h3 text-center py-[1.5rem] md:py-10 ">
            {type === 'login' ? 'Log in' : 'Sign up'}
          </h2>
          {type === 'login' ? <LoginForm /> : <SignupForm />}
          {/* Divider Line with OR */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-xs sm:text-sm text-gray-500 font-medium">
              OR
            </span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div>
            <GoogleLoginButton />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AuthForm;
