'use client'; // Ensure client-side execution

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid verification link.');
      return;
    }

    fetch(`http://localhost:8080/auth/verify-email?token=${token}`)
      .then(() => setMessage('✅ Email verified successfully!'))
      .catch(() => setMessage('❌ Invalid or expired token.'));
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold">{message}</h2>
    </div>
  );
};

export default VerifyEmail;
