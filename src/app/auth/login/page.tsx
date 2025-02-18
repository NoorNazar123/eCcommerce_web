import Link from 'next/link';
import React from 'react';
import LoginForm from './loginForm';

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className=" p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <LoginForm />
        <hr />
        {/* here we need to use a tag bez we use nest callback so is import {  } from " use a for better experience"; */}
        <a
          className="text-blue-600 hover:underline"
          href={`http://localhost:8080/auth/google/login`}
        >
          sign in with google
        </a>
        <p className="text-center text-gray-600 text-sm mt-4">
          Do not have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
