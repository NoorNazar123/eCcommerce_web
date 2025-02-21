'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitForm from '@/components/SubmitButton';
import { logIn } from '@/lib/auth';
import { FormState } from '@/types/type';
import Link from 'next/link';
import { formLoginFields } from '@/data/auth.data';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [state, setState] = useState<FormState | undefined>(undefined);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Call logIn without the first argument (or pass undefined if required)
    const result = await logIn(undefined, formData);
    console.log('result123', result);
    if (result) {
      setState({
        error: {
          message:
            result.message || result.error?.message || 'An error occurred.',
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ✅ Show Success Message */}
      {state?.success && (
        <p className="para text-green-500 px-3 py-2 rounded mt-2">
          {state.success}
        </p>
      )}
      {/* Error Message */}
      {state?.error?.message && (
        <p className="para text-[14px] text-red-500 line-clamp-1 text-center">
          {state.error.message}
        </p>
      )}

      {/* Dynamically Render Form Fields */}
      {formLoginFields &&
        formLoginFields.map(
          ({ id, name, type, label, placeholder, errorKey }) => (
            <div key={id} className="py-[8px] relative">
              <Label htmlFor={id} className="para font-normal text-[16px]">
                {label}
              </Label>
              <Input
                id={id}
                name={name}
                placeholder={placeholder}
                type={
                  name === 'password'
                    ? passwordVisible
                      ? 'text'
                      : 'password'
                    : type
                }
              />
              {/* Eye Icon */}
              {name === 'password' && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-4 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
              {/* Render error message if exists */}
              {state?.error && (
                <p className="para text-[12px] text-red-500 line-clamp-1">
                  {state.error[errorKey as keyof typeof state.error]}
                </p>
              )}
            </div>
          ),
        )}

      {/* Forgot Password Link */}
      <div className="text-right mt-1">
        <Link
          href="/auth/forgot-password"
          className="para text-[15px] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <div>
        <SubmitForm>Log in</SubmitForm>
      </div>
    </form>
  );
};

export default LoginForm;

// 'use client';

// import React from 'react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import SubmitButton from '@/components/SubmitButton';
// import { logIn } from '@/lib/auth';
// import { FcGoogle } from 'react-icons/fc';
// import Link from 'next/link';

// const LoginForm = () => {
//   const [state, action] = React.useActionState(logIn, undefined);

//   return (
//     <form
//       action={action}
//       className="space-y-4 h-auto bg-white w-full max-w-md mx-auto  p-9 rounded-lg border-[1px] border-gray-200 "
//     >
//       {/* Error Message */}
//       {state?.error?.message && (
//         <p className="text-xs sm:text-sm bg-red-500 text-white p-2 rounded">
//           {state.error.message}
//         </p>
//       )}

//       {/* Email Input */}
//       <div>
//         <Label
//           htmlFor="email"
//           className="block text-sm font-medium tracking-wide text-gray-800"
//         >
//           Email
//         </Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="Enter your email"
//           className="w-full mt-1 px-2 py-5 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//       {state?.error?.email && (
//         <p className="text-xs sm:text-sm text-red-500">{state.error.email}</p>
//       )}

//       {/* Password Input */}
//       <div>
//         <Label
//           htmlFor="password"
//           className="block text-sm font-medium tracking-wide text-gray-800"
//         >
//           Password
//         </Label>
//         <Input
//           id="password"
//           name="password"
//           type="password"
//           placeholder="Enter your password"
//           className="w-full mt-1 px-2 py-5 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-1"
//         />
//         <div className="text-right mt-1">
//           <Link
//             href="#"
//             className="text-xs sm:text-sm text-blue-400 hover:underline"
//           >
//             Forgot password?
//           </Link>
//         </div>
//       </div>
//       {state?.error?.password && (
//         <div className="text-xs sm:text-sm text-red-500">
//           <p>Password must be:</p>
//           <ul className="list-disc pl-5">
//             {state.error.password.map((error: string, index: number) => (
//               <li key={index}>{error}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Submit Button */}
//       <SubmitButton>Log in</SubmitButton>
//     </form>
//   );
// };

// export default LoginForm;
