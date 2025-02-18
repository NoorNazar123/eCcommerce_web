'use client';

import React from 'react';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';
import Loading from '@/app/loading';

interface SubmitButtonProps {
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? <Loading size="w-[20px] h-[20px]" /> : children}
    </Button>
  );
};

export default SubmitButton;
