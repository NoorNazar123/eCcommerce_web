'use server';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { IncomingMessage, ServerResponse } from 'http';
import { Session } from '@/types/type';

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
