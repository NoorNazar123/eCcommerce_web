'use server';

import { redirect } from 'next/navigation';
import { FormState, loginFormSchema, signupFormSchema } from '@/types/type';
import { createSession, getSession } from './session';

export async function signUp(
  state: FormState | null,
  formData: FormData,
): Promise<FormState | void> {
  // console.log("Received Form Data:", formData.get("username"), formData.get("email"), formData.get("password"));

  // Validate form data
  const validationFields = signupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Send data to backend API
    const response = await fetch(`http://localhost:8080/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationFields.data), // Send validated data
    });

    if (!response.ok) {
      // Handle API errors
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        return { error: { message: 'Signup failed. Please try again.' } };
      }
      return {
        error: {
          message: errorData?.message || 'Signup failed. Please try again.',
        },
      };
    }

    // Redirect on success
    redirect('/auth/login');
  } catch (error) {
    // Check if the error is a redirect error
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      // Rethrow the redirect error to let Next.js handle it
      throw error;
    }

    // Handle other errors
    // console.error("Signup Error:", error);
    return {
      error: { message: 'Something went wrong. Please try again later.' },
    };
  }
}

export async function logIn(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // Validate form data using Zod schema
  const validationFields = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // Fix 1: Ensure validation failure returns properly formatted error
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors, // Ensure front-end can handle this structure
    };
  }

  const response = await fetch(`http://localhost:8080/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validationFields.data), // Fix 2: Send only validated data
  });

  if (response.ok) {
    const results = await response.json();

    // Fix 3: Properly handle missing accessToken or refreshToken
    if (!results.accessToken) {
      console.error('Missing access token in response!');
      return {
        error: { message: 'Authentication failed. No access token received.' }, // Fix typo: 'access' token
      };
    }

    if (!results.refreshToken) {
      console.error('Missing refresh token in response!');
      return {
        error: { message: 'Authentication failed. No refresh token received.' }, // Fix typo: 'refresh' token
      };
    }

    await createSession({
      user: {
        id: results.id,
        username: results.username,
        role: results.role,
      },
      accessToken: results.accessToken,
      refreshToken: results.refreshToken,
    });

    // Fix 4: Ensure redirect is returned to stop function execution
    return redirect('/');
  } else {
    return {
      // Fix 5: Typo correction: 'Invaled' → 'Invalid'
      message:
        response.status === 401 ? 'Invalid Password' : response.statusText,
    };
  }
}

// export async function logIn(
//   state: FormState,
//   formData: FormData,
// ): Promise<FormState> {
//   // Fix: Correct parameter name
//   const validationFields = loginFormSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

//   // Fix: Handle validation results properly
//   if (!validationFields.success) {
//     return {
//       error: validationFields.error.flatten().fieldErrors,
//     };
//   }

//   const response = await fetch(`http://localhost:8080/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(validationFields.data), // Send validated data
//   });
//   if (response.ok) {
//     //sign done
//     const results = await response.json();

//     // console.log("Login Response:", results); // ✅ Debugging step

//     if (!results.accessToken) {
//       console.error('Missing access token in response!');
//       return {
//         error: { message: 'Authentication failed. No token received.' },
//       };
//     }

//     if (!results.refreshToken) {
//       console.error('Missing access token in response!');
//       return {
//         error: { message: 'Authentication failed. No refrsh token received.' },
//       };
//     }

//     await createSession({
//       user: {
//         id: results.id,
//         username: results.username,
//         role: results.role,
//       },
//       accessToken: results.accessToken,
//       refreshToken: results.refreshToken,
//     });
//     redirect('/');
//   } else {
//     return {
//       message:
//         response.status === 401 ? 'Invaled Password' : response.statusText,
//     };
//   }
// }

export const refreshToken = async (oldRefreshToken: string) => {
  const session = await getSession();

  try {
    const response = await fetch(`http://localhost:8080/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    // console.log("oldRefreshToken9", await response.json())
    // if (!response.ok) {
    //     throw new Error(
    //         "Failed to refresh token" + response.statusText
    //     );
    // }

    const { accessToken, refreshToken } = await response.json();
    // update session with new tokens
    console.log('khkhkk', accessToken, refreshToken);
    const updateRes = await fetch(
      'http://localhost:3000/api/auth/update', //it remain same it client url
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken,
          refreshToken,
          user: session?.user,
        }),
      },
    );
    // const updateRes = await fetch(
    //     "http://localhost:3000/api/auth/update",
    //     {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             accessToken,
    //             refreshToken,
    //         }),
    //     }
    // );

    if (!updateRes.ok) throw new Error('Failed to update the tokens');

    return accessToken;
  } catch (err) {
    console.error('Refresh Token failed:', err);
    return null;
  }
};
