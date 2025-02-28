'use server';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
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

// Validate environment variable
const secretKey = process.env.SESSION_SECRET_KEY;
if (!secretKey) {
  throw new Error(
    'SESSION_SECRET_KEY is not defined in the environment variables.',
  );
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  try {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session = await new SignJWT({
      user: payload.user,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encodedKey);

    // ✅ Await cookies() before using .set()
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiredAt,
      sameSite: 'lax',
      path: '/',
    });
    // console.log("Session Successfully Created:", cookieStore);
    return { success: true, session };
  } catch (error) {
    console.error('Failed to create session:', error);
    throw new Error('Failed to create session');
  }
}

export async function getSession(): Promise<Session | null> {
  try {
    // Get session cookie
    const cookie = (await cookies()).get('session')?.value;
    console.log('Session cookie:', cookie); // Debug: Log the cookie value
    if (!cookie) return null;

    // Verify JWT
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });
    // console.log('Verified payload:', cookie); // Debug: Log the verified payload

    // Validate payload structure
    if (payload && typeof payload === 'object' && 'user' in payload) {
      return payload as Session;
    }
    return null;
  } catch (error) {
    console.error('Failed to verify session:', error);
    return null; // Let the caller handle the redirection
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

export async function updateTokens({
  accessToken,
  refreshToken,
  user,
}: {
  accessToken: string;
  refreshToken: string;
  user: any;
}) {
  // const cookie = (await cookies()).get("session")?.value;
  // const session = await getSession();
  await deleteSession();
  console.log('newtestppp', accessToken, refreshToken, user);
  // if (!cookie) return null;
  // console.log("newtest", accessToken, refreshToken, cookie)
  // const { payload } = await jwtVerify<Session>(
  //     cookie,
  //     encodedKey
  // );

  // if (!session) throw new Error("Session not found");

  const newPayload: Session = {
    user: user,
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}
