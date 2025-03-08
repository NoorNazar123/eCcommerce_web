'use server';

import { redirect } from 'next/navigation';
import { BACKEND_URL } from '@/constants/constants';
import { FormState, loginFormSchema, signupFormSchema } from '@/types/type';
import { createSession } from './session';

export async function signUp(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
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

  const response = await fetch(`http://localhost:8080/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect('/auth/login');
  } else
    return {
      message:
        response.status === 409
          ? 'The user is already existed!'
          : response.statusText,
    };
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`http://localhost:8080/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.ok) {
    const result = await response.json();
    console.log('result123', result);

    const { data, statusCode } = result;

    await createSession({
      user: {
        id: data.id,
        username: data.username,
        role: data.role,
      },
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    redirect('/');
  } else {
    const error = await response.json();
    console.log('B ERR:', error);

    return {
      message:
        error.message ||
        'Invalid credentials or user not found. Please ensure you have registered and verified your account.',
    };
  }
}

// export async function login(
//   state: FormState,
//   formData: FormData,
// ): Promise<FormState> {
//   // Validate the form data
//   const validatedFields = loginFormSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

//   // If validation fails, return the validation errors
//   if (!validatedFields.success) {
//     return {
//       error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   try {
//     // Send a POST request to the backend
//     const response = await fetch(`http://localhost:8080/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(validatedFields.data),
//     });

//     // If the response is OK, handle the success case
//     if (response.ok) {
//       const result = await response.json();
//       console.log('result123', result);

//       const { data, statusCode } = result;

//       await createSession({
//         user: {
//           id: data.id,
//           username: data.username,
//           role: data.role,
//         },
//         accessToken: data.accessToken,
//         refreshToken: data.refreshToken,
//       });

//       // Redirect to the home page
//       redirect('/');
//     } else {
//       // If the response is not OK, handle the error case
//       const errorResponse = await response.json();
//       return {
//         message: errorResponse.message || 'An error occurred during login.',
//       };
//     }
//   } catch (error) {
//     // Handle any unexpected errors
//     console.error('Login error:', error);
//     return {
//       message: 'An unexpected error occurred. Please try again later.',
//     };
//   }
// }

export const refreshToken = async (oldRefreshToken: string) => {
  // console.log('oldReftoken🔥', oldRefreshToken);

  try {
    // Step 1: Call the backend to refresh the token
    const response = await fetch(`http://localhost:8080/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    // Check if the response is successful
    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to refresh token:', error);
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    // Parse the response body as JSON
    const data = await response.json();
    // console.log('Response from backend:', data);

    // Extract the new tokens from the `data` object
    const { accessToken, refreshToken } = data.data as {
      accessToken: string;
      refreshToken: string;
    };

    // Check if tokens are present
    if (!accessToken || !refreshToken) {
      throw new Error('Tokens not found in the response');
    }

    // console.log('New Access Token:🔥', accessToken);
    // console.log('New Refresh Token:🔥', refreshToken);

    // Return the new tokens as an object
    return { accessToken, refreshToken };
  } catch (err) {
    console.error('Refresh Token failed:', err);
    return null;
  }
};
