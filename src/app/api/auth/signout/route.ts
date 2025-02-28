// import { authFetch } from '@/lib/authFetch';
// import { cookies } from 'next/headers'; // ✅ Ye wala import zaroor check kar!
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   try {
//     console.log('Logging out...');

//     // ✅ NO need for `await`, yahi teri problem ka solution hai!
//     const cookieStore = cookies();
//     const sessionToken = (await cookieStore).get('session')?.value;

//     console.log('Current Session Before Logout:', sessionToken);

//     if (!sessionToken) {
//       return NextResponse.json(
//         { message: 'Session not found' },
//         { status: 401 },
//       );
//     }

//     // ✅ Decode JWT session (If needed)
//     const session = JSON.parse(
//       Buffer.from(sessionToken.split('.')[1], 'base64').toString(),
//     );

//     console.log('Decoded Session:', session);

//     if (!session?.refreshToken) {
//       return NextResponse.json(
//         { message: 'Refresh token not found!' },
//         { status: 401 },
//       );
//     }

//     // ✅ Call API to logout
//     const response = await authFetch(`http://localhost:8080/auth/signout`, {
//       method: 'POST',
//     });

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       console.error('Logout API error:', errorMessage);
//       return NextResponse.json(
//         { message: 'Logout API failed', error: errorMessage },
//         { status: response.status },
//       );
//     }

//     // ✅ Delete session
//     (
//       await // ✅ Delete session
//       cookies()
//     ).delete('session');

//     return NextResponse.redirect(new URL('/', req.nextUrl), {
//       headers: { 'Cache-Control': 'no-store' },
//     });
//   } catch (error) {
//     console.error('Logout failed:', error);
//     return NextResponse.json(
//       { message: 'Failed to delete session', error: String(error) },
//       { status: 500 },
//     );
//   }
// }

import { authFetch } from '@/lib/authFetch';
import { deleteSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    console.log('🔵 Next.js API: Logout Requested');

    // Make sure the authFetch function sends the Authorization header with the token
    const response = await authFetch(`http://localhost:8080/auth/signout`, {
      method: 'POST',
    });

    console.log('🔴 Response Status:', response.status);

    if (response.ok) {
      console.log('🟢 Backend Logout Successful!');
      await deleteSession(); // Delete the session locally
    } else {
      console.error('❌ Backend Logout Failed!', response.status);
    }

    return NextResponse.redirect(new URL('/', req.nextUrl), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('❌ Next.js Logout Error:', error);
    return NextResponse.json({ message: 'Logout failed!' }, { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     // Call the signout endpoint
//     const response = await authFetch(`http://localhost:8080/auth/signout`, {
//       method: 'POST',
//     });

//     // If the signout is successful, delete the session
//     if (response.ok) {
//       await deleteSession();
//     }

//     // Redirect to the home page
//     return NextResponse.redirect(new URL('/', req.nextUrl), {
//       headers: {
//         'Cache-Control': 'no-store', // Prevents client-side caching
//       },
//     });
//   } catch (error) {
//     console.error('Failed to delete session:', error); // Log the error for debugging
//     return NextResponse.json(
//       { message: 'Failed to delete session', error },
//       { status: 500 },
//     );
//   }
// }
