'use server';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Role } from '@/types/type';
import { IncomingMessage, ServerResponse } from 'http';

export type Session = {
  user: {
    id: string;
    username: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(
  payload?: Session,
  req?: IncomingMessage & { cookies: Partial<{ [key: string]: string }> },
  res?: ServerResponse<IncomingMessage>,
) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);

  console.log('Creating session with payload:', payload);
  console.log('Session token:', session);
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', // Only secure in production
    secure: false,
    expires: expiredAt,
    sameSite: 'lax',
    path: '/',
  });

  console.log('Session created successfully');
}
export async function getSession(
  req?: IncomingMessage & { cookies: Partial<{ [key: string]: string }> },
) {
  const cookie = (await cookies()).get('session')?.value;
  console.log('Fetching session cookie:🔥', cookie);

  if (!cookie) {
    console.log('No session cookie found');
    return null;
  }

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });

    console.log('Decoded session payload:', payload);
    return payload as Session;
  } catch (err) {
    console.error('Failed to verify the session:', err);
    redirect('/auth/signin');
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

// export async function updateTokens({
//   accessToken,
//   refreshToken,
// }: {
//   accessToken: string;
//   refreshToken: string;
// }) {
//   const cookie = (await cookies()).get('session')?.value;

//   console.log('cookie🔥', cookie);

//   if (!cookie) return null;

//   const { payload } = await jwtVerify<Session>(cookie, encodedKey);

//   if (!payload) throw new Error('Session not found');

//   const newPayload: Session = {
//     user: {
//       ...payload.user,
//     },
//     accessToken,
//     refreshToken,
//   };

//   await createSession(newPayload);
// }

// export async function updateTokens({
//   accessToken,
//   refreshToken,
// }: {
//   accessToken: string;
//   refreshToken: string;
// }) {
//   console.log('acess:🔥', accessToken, 'ref:🔥', refreshToken);

//   // const cookie = (await cookies()).get('session')?.value;
//   const cookieStore = await cookies();
//   const cookie = cookieStore.get('session');

//   console.log('Fetching session cookie for update:🔥', cookie);

//   if (!cookie) {
//     console.error('Session cookie not found');
//     throw new Error('Session cookie not found');
//   }

//   try {
//     const { payload } = await jwtVerify<Session>(cookie, encodedKey);
//     console.log('Decoded session payload for update:', payload);

//     if (!payload) {
//       console.error('Invalid session payload');
//       throw new Error('Invalid session payload');
//     }

//     const newPayload: Session = {
//       user: {
//         ...payload.user,
//       },
//       accessToken,
//       refreshToken,
//     };

//     console.log('Updating session with new payload:', newPayload);
//     await createSession(newPayload);

//     console.log('Tokens updated successfully');
//   } catch (err) {
//     console.error('Failed to update tokens:', err);
//     throw new Error('Failed to update tokens');
//   }
// }
