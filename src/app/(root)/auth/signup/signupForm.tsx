'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitForm from '../../../../components/SubmitButton';
import { signUp } from '@/lib/auth';
import { FormState } from '@/types/type';

const SignupForm = () => {
  const [state, setState] = useState<FormState | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signUp(null, formData);

    if (result) {
      setState(result);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-[#0000] p-6 rounded-lg shadow-md w-96"
    >
      {state?.error?.message && (
        <p className="text-sm bg-red-500 text-white p-2 rounded">
          {state.error.message}
        </p>
      )}

      {/* Username Input */}
      <div>
        <Label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </Label>
        <Input
          id="username"
          name="username"
          placeholder="Enter your username"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.error?.username && (
          <p className="text-sm text-red-500">{state.error.username}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {state?.error?.password && (
          <div className="text-sm text-red-500">
            <p>Password must be:</p>
            <ul className="list-disc pl-5">
              {state.error.password.map((error: any, index: number) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <SubmitForm>Sign Up</SubmitForm>
    </form>
  );
};

export default SignupForm;

// old code

// "use client";

// import React, { useState } from "react";
// import { signUp } from "@/lib/auth"; // Import your signUp function

// const SignupForm = () => {
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<boolean>(false);

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget);

//         const result = await signUp(formData);

//         if (result?.error) {
//             setError(result.error);
//             setSuccess(false);
//         } else {
//             setError(null);
//             setSuccess(true);
//             alert("Signup successful! 🎉");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md w-96">
//             {error && <p className="text-sm bg-red-500 text-white p-2 rounded">{error}</p>}
//             {success && <p className="text-sm bg-green-500 text-white p-2 rounded">Signup successful!</p>}

//             <div>
//                 <label htmlFor="username">Username</label>
//                 <input id="username" name="username" required className="w-full px-3 py-2 border rounded" />
//             </div>

//             <div>
//                 <label htmlFor="email">Email</label>
//                 <input id="email" name="email" type="email" required className="w-full px-3 py-2 border rounded" />
//             </div>

//             <div>
//                 <label htmlFor="password">Password</label>
//                 <input id="password" name="password" type="password" required className="w-full px-3 py-2 border rounded" />
//             </div>

//             <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
//                 Sign Up
//             </button>
//         </form>
//     );
// };

// export default SignupForm;
