'use client';

import React from 'react';
import LoginForm from '@/app/(root)/auth/login/loginForm';
import SignupForm from '@/app/(root)/auth/signup/signupForm';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GoogleLoginButton from './GoogleLoginButton';

const AuthForm = ({ type }: { type: 'login' | 'signup' }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="layout-container pt-[4rem] md:flex items-center justify-between"
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className=" hidden sm:flex md:w-[48%]"
        >
          <Image
            src="/fromImg.gif"
            alt="Auth Image"
            width={700}
            height={400}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:w-[40%] shadow-md px-6  py-4 rounded-lg"
        >
          <h2 className="heading-h3 text-center py-10 ">
            {type === 'login' ? 'Login' : 'Sign Up'}
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
