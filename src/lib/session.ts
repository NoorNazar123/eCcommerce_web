'use server';

import { jwtVerify, SignJWT } from 'jose';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Role } from '@/types/type';

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

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookie = (await cookies()).get('session')?.value;
  console.log('cookie123', cookie);

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });

    console.log('🔵 JWT Payload:', payload);
    console.log('🟢 Refresh Token:', payload.refreshToken); // Yeh check karo

    return payload as Session;
  } catch (err) {
    console.error('❌ Failed to verify the session', err);
    redirect('/auth/signin');
  }
}

export async function deleteSession() {
  await (await cookies()).delete('session');
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error('Session not found');

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}
