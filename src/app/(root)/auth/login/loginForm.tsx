'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitForm from '@/components/SubmitButton';
import { logIn } from '@/lib/auth';
import { FormState } from '@/types/type';
import Link from 'next/link';

const LoginForm = () => {
  const [state, setState] = useState<FormState | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Call logIn without the first argument (or pass undefined if required)
    const result = await logIn(undefined, formData); // Fix: Replace `null` with `undefined`

    if (result) {
      setState(result);
    }
  };

  // Define form fields dynamically
  const formFields = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      errorKey: 'email',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      errorKey: 'password',
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Error Message */}
      {state?.error?.message && (
        <p className="para text-[12px] text-red-500 line-clamp-1">
          {state.error.message}
        </p>
      )}

      {/* Dynamically Render Form Fields */}
      {formFields.map(({ id, name, type, label, placeholder, errorKey }) => (
        <div key={id} className="py-[8px]">
          <Label htmlFor={id} className="para font-normal text-[16px]">
            {label}
          </Label>
          <Input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            className=""
          />
          {/* Render error message if exists */}
          {state?.error && (
            <p className="para text-[12px] text-red-500 line-clamp-1">
              {state.error[errorKey as keyof typeof state.error]}
            </p>
          )}
        </div>
      ))}

      {/* Forgot Password Link */}
      <div className="text-right mt-1">
        <Link href="#" className="para text-[15px] hover:underline">
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

// 'use client';

// import React from 'react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import SubmitForm from '@/components/SubmitButton';
// import { logIn } from '@/lib/auth';

// const LoginForm = () => {
//   const [state, action] = React.useActionState(logIn, undefined);
//   return (
//     <form action={action} className="space-y-4  p-6 rounded-lg shadow-md w-96">
//       {/* Email Input */}
//       {state?.error?.message && (
//         <p className="text-sm bg-red-500 text-white p-2 rounded">
//           {state.error.message}
//         </p>
//       )}

//       <div>
//         <Label
//           htmlFor="email"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Email
//         </Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="Enter your email"
//           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//       {state?.error?.email && (
//         <p className="text-sm text-red-500">{state.error.email}</p>
//       )}

//       {/* Password Input */}
//       <div>
//         <Label
//           htmlFor="passwo rd"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Password
//         </Label>
//         <Input
//           id="password"
//           name="password"
//           type="password"
//           placeholder="Enter your password"
//           className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//       {state?.error?.password && (
//         <div className="text-sm text-red-500">
//           <p>Password must be:</p>
//           <ul className="list-disc pl-5">
//             {state.error.password.map((error: any, index: number) => (
//               <li key={index}>{error}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Forgot Password Link */}
//       <div className="text-right">
//         <a href="#" className="text-sm text-blue-500 hover:underline">
//           Forgot password?
//         </a>
//       </div>

//       {/* Submit Button */}
//       <SubmitForm>Sign in</SubmitForm>
//     </form>
//   );
// };

// export default LoginForm;
