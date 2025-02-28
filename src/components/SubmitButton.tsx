'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Loading from '@/app/loading';

interface SubmitButtonProps {
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full btn btn-outline h-[65px] para bg-[#FFD79E] text-[22px] dark:bg-transparent transition rounded-lg shadow-md py-[20px] mt-8"
    >
      {pending ? <Loading size="w-[20px] h-[20px]" /> : children}
    </button>
  );
};

export default SubmitButton;
