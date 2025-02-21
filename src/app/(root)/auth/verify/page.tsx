'use client'; // Ensure client-side execution

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [message, setMessage] = useState('Verifying your account...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setMessage('❌ Invalid verification link.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/auth/verify-email?token=${token}`)
      .then((response) => {
        if (!response.ok) throw new Error('Invalid or expired token.');
        return response.json();
      })
      .then(() => {
        setMessage('✅ Email verified successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/auth/login'); // Redirect after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        setMessage(error.message || '❌ Verification failed.');
      })
      .finally(() => setLoading(false));
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Verifying...</p>
        </div>
      ) : (
        <h2 className="text-xl font-bold">{message}</h2>
      )}
    </div>
  );
};

export default VerifyEmail;
