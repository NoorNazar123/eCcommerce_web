// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession, createSession, Session } from '@/lib/session';
import { refreshToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('🛠️ Middleware executing for path:', path);

  // Check if the request is for a protected route
  if (path.startsWith('/profile')) {
    console.log('🔒 Protected route detected:', path);

    const session = await getSession();
    console.log('📄 Session data:', session);

    if (!session) {
      console.log('🚫 No session found. Redirecting to login...');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Check if the access token is expired
    const isTokenExpired = checkIfTokenExpired(session.accessToken);
    console.log('⏳ Is access token expired?', isTokenExpired);

    if (isTokenExpired) {
      console.log('🔄 Refreshing token...');
      try {
        // Call the refreshToken function
        const newTokens = await refreshToken(session.refreshToken);
        console.log('✅ New access token:', newTokens);

        if (newTokens) {
          // Update the session with new tokens
          const newSession: Session = {
            user: session.user,
            accessToken: newTokens.accessToken, // string
            refreshToken: newTokens.refreshToken, // string
          };

          console.log('🆕 New session data:', newSession);

          // Create a new session cookie
          await createSession(newSession);
          console.log('🍪 Session cookie updated successfully!');

          // Continue to the requested page
          return NextResponse.next();
        } else {
          console.log('❌ Failed to refresh token. Redirecting to login...');
          return NextResponse.redirect(new URL('/auth/login', request.url));
        }
      } catch (error) {
        console.error('🔥 Failed to refresh token:', error);
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }
  }

  console.log('✅ No action required. Continuing to the requested page...');
  return NextResponse.next();
}

// Helper function to check if the token is expired
function checkIfTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const isExpired = payload.exp * 1000 < Date.now();
  console.log('⏰ Token expiry check:', isExpired ? 'Expired' : 'Not expired');
  return isExpired;
}

export const config = {
  matcher: ['/profile/:path*'],
};
