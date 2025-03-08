import { refreshToken } from './auth';
import { createSession, getSession } from './session';

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: FetchOptions = {},
) => {
  let session = await getSession();

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  let response = await fetch(url, options);
  // console.log('res:8#?', response);

  if (response.status === 401) {
    if (!session?.refreshToken) throw new Error('refresh token not found!');

    // Call the refreshToken function to get new tokens
    const newTokens = await refreshToken(session.refreshToken);
    // console.log('🔄 New tokens:', newTokens);

    if (newTokens) {
      // Update the session with new tokens
      const newSession = {
        user: session.user,
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
      };

      // Create a new session cookie
      await createSession(newSession);
      // console.log('🍪 Session cookie updated successfully!');

      // Update the headers with the new access token
      options.headers.Authorization = `Bearer ${newTokens.accessToken}`;

      // Retry the request with the new access token
      response = await fetch(url, options);
    } else {
      throw new Error('Failed to refresh token');
    }
  }

  return response;
};
// import { getSession } from './session';

// export interface FetchOptions extends RequestInit {
//   headers?: Record<string, string>;
// }

// export const authFetch = async (
//   url: string | URL,
//   options: FetchOptions = {},
// ) => {
//   let session = await getSession();

//   options.headers = {
//     ...options.headers,
//     Authorization: `Bearer ${session?.accessToken}`,
//   };

//   let response = await fetch(url, options);
//   console.log('res:8#?', response);

//   if (response.status === 401) {
//     if (!session?.refreshToken) throw new Error('refresh token not found!');

//     const newSession = await getSession();
//     console.log('🔄 New access token:', newSession);

//     if (newSession) {
//       session.accessToken = newSession.accessToken;

//       options = {
//         ...options,
//         headers: {
//           ...options.headers,
//           Authorization: `Bearer ${newSession.accessToken}`,
//         },
//       };
//       response = await fetch(url, options);
//     }
//   }

//   return response;
// };

// import { refreshToken } from './auth';
// import { getSession } from './session';

// export interface FetchOptions extends RequestInit {
//   headers?: Record<string, string>;
// }

// export const authFetch = async (
//   url: string | URL,
//   options: FetchOptions = {},
// ) => {
//   const session = await getSession();
//   console.log(
//     'session123',
//     session,
//     session?.accessToken,
//     session?.refreshToken,
//     session?.user,
//   );

//   options.headers = {
//     ...options.headers,
//     Authorization: `Bearer ${session?.accessToken}`,
//   };
//   let response = await fetch(url, options);
//   console.log({
//     StaTTTTTTTTTTTTTTTTTTTTUS: response.status,
//   });
//   console.log('session0012outer', session);
//   if (response.status === 401) {
//     if (!session?.refreshToken) throw new Error('refresh token not found!');

//     const newAccessToken = await refreshToken(session.refreshToken);
//     console.log('session0012', session, newAccessToken);
//     if (newAccessToken) {
//       options = {
//         ...options,
//         headers: {
//           ...options.headers,
//           Authorization: `Bearer ${newAccessToken}`,
//         },
//       };
//       response = await fetch(url, options);
//     }
//   }
//   return response;
// };
