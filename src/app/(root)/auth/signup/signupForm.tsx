'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitForm from '@/components/SubmitButton';
import { signUp } from '@/lib/auth';
import { FormState } from '@/types/type';
import { formSignupFields } from '@/data/auth.data';
import { Eye, EyeOff } from 'lucide-react';

const SignupForm = () => {
  const [state, setState] = useState<FormState | undefined>(undefined);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signUp(null, formData);

    if (result) {
      setState(result);
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
        <p className="para text-[15px] bg-red-500 text-white px-2  rounded">
          {state.error.message}
        </p>
      )}

      {/* Dynamically Render Form Fields */}
      {formSignupFields &&
        formSignupFields.map(
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
                  {/* Use type assertion to access error message dynamically */}
                  {state.error[errorKey as keyof typeof state.error]}
                </p>
              )}
            </div>
          ),
        )}

      {/* Submit Button */}
      <SubmitForm>Sign up</SubmitForm>
    </form>
  );
};

export default SignupForm;

//'use client';

// import React, { useState } from 'react';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import SubmitForm from '@/components/SubmitButton';
// import { signUp } from '@/lib/auth';
// import { FormState } from '@/types/type';
// import { FcGoogle } from 'react-icons/fc';
// import Link from 'next/link';

// const SignupForm = () => {
//   const [state, setState] = useState<FormState | undefined>(undefined);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const result = await signUp(null, formData);

//     if (result) {
//       setState(result);
//     }
//   };

//   const formFields = [
//     {
//       id: 'username',
//       name: 'username',
//       type: 'text',
//       label: 'Username',
//       placeholder: 'Enter your username',
//       errorKey: 'username',
//     },
//     {
//       id: 'email',
//       name: 'email',
//       type: 'email',
//       label: 'Email',
//       placeholder: 'Enter your email',
//       errorKey: 'email',
//     },
//     {
//       idf: 1,
//       id: 'password',
//       name: 'password',
//       type: 'password',
//       label: 'Password',
//       placeholder: 'Enter your password',
//       errorKey: 'password',
//     },
//   ];

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Error Message */}
//       {state?.error?.message && <p className="para">{state.error.message}</p>}

//       {/* Dynamically Render Form Fields */}
//       {formFields.map(({ id, name, type, label, placeholder, errorKey }) => (
//         <div key={id}>
//           <Label
//             htmlFor={id}
//             className="block text-sm font-medium text-gray-800"
//           >
//             {label}
//           </Label>
//           <Input
//             id={id}
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             className="w-full mt-1 px-2 py-5 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//           {state?.error?.[errorKey] && (
//             <p className="text-xs sm:text-sm text-red-500">
//               {state.error[errorKey]}
//             </p>
//           )}
//         </div>
//       ))}

//       {/* Submit Button */}
//       <SubmitForm>Sign Up</SubmitForm>

//       {/* Divider Line with OR */}
//       <div className="flex items-center my-4">
//         <div className="flex-grow h-px bg-gray-300"></div>
//         <span className="px-3 text-xs sm:text-sm text-gray-500 font-medium">
//           OR
//         </span>
//         <div className="flex-grow h-px bg-gray-300"></div>
//       </div>

//       {/* Google Sign-in Button */}
//       <Link
//         href={`http://localhost:8080/auth/google/login`}
//         className="flex items-center tracking-wide justify-center gap-2 font-medium text-xs sm:text-sm bg-white text-gray-500 py-2 w-full rounded-md border-[1px] border-gray-200 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <FcGoogle className="text-xl" />
//         Continue With Google
//       </Link>
//     </form>
//   );

// };

// export default SignupForm;

// <form onSubmit={handleSubmit}>
//   {/* Error Message */}
//   {state?.error?.message && <p className=" para">{state.error.message}</p>}

//   {/* Username Input */}
//   <div>
//     <Label htmlFor="username" className="para">
//       Username
//     </Label>
//     <Input
//       id="username"
//       name="username"
//       placeholder="Enter your username"
//       className="w-full mt-1 px-2 py-5 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
//     />
//     {state?.error?.username && (
//       <p className="text-xs sm:text-sm text-red-500">
//         {state.error.username}
//       </p>
//     )}
//   </div>

//   {/* Email Input */}
//   <div>
