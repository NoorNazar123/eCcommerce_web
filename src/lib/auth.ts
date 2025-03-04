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
    // console.log('result123', result);

    const { data, statusCode } = result;

    // console.log('data123', data.id);
    // console.log(
    //   'loginATRT123',
    //   'ref',
    //   data.refreshToken,
    //   'aceess',
    //   data.accessToken,
    // );

    // TODO: Create The Session For Authenticated User.

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
    return {
      message:
        response.status === 401 ? 'Invalid Credentials!' : response.statusText,
    };
  }
}

export const refreshToken = async (oldRefreshToken: string) => {
  console.log('oldReftoken🔥', oldRefreshToken);

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
    console.log('Response from backend:', data);

    // Extract the new tokens from the `data` object
    const { accessToken, refreshToken } = data.data as {
      accessToken: string;
      refreshToken: string;
    };

    // Check if tokens are present
    if (!accessToken || !refreshToken) {
      throw new Error('Tokens not found in the response');
    }

    console.log('New Access Token:🔥', accessToken);
    console.log('New Refresh Token:🔥', refreshToken);

    // Return the new tokens as an object
    return { accessToken, refreshToken };
  } catch (err) {
    console.error('Refresh Token failed:', err);
    return null;
  }
};
