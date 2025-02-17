import { createSession } from '@/lib/session';
import { Role } from '@/types/type';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const userId = searchParams.get('userId');
  const username = searchParams.get('username');
  const role = searchParams.get('role');

  if (!accessToken || !refreshToken || !userId || !username || !role)
    throw new Error('Google Ouath Failed!');

  await createSession({
    user: {
      id: userId,
      username: username,
      role: role as Role,
    },
    accessToken,
    refreshToken,
  });

  redirect('/');
}
