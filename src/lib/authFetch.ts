import { refreshToken } from './auth';
import { getSession } from './session';

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: FetchOptions = {},
) => {
  const session = await getSession();
  console.log(
    'session123',
    session,
    session?.accessToken,
    session?.refreshToken,
    session?.user,
  );

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };
  let response = await fetch(url, options);
  console.log({
    StaTTTTTTTTTTTTTTTTTTTTUS: response.status,
  });
  console.log('session0012outer', session);
  if (response.status === 401) {
    if (!session?.refreshToken) throw new Error('refresh token not found!');

    const newAccessToken = await refreshToken(session.refreshToken);
    console.log('session0012', session, newAccessToken);
    if (newAccessToken) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      };
      response = await fetch(url, options);
    }
  }
  return response;
};
