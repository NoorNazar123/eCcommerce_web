import { authFetch } from '@/lib/authFetch';
import { deleteSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Call the signout endpoint
    const response = await authFetch(`http://localhost:8080/auth/signout`, {
      method: 'POST',
    });

    // If the signout is successful, delete the session
    if (response.ok) {
      await deleteSession();
    }

    // Redirect to the home page
    return NextResponse.redirect(new URL('/', req.nextUrl), {
      headers: {
        'Cache-Control': 'no-store', // Prevents client-side caching
      },
    });
  } catch (error) {
    console.error('Failed to delete session:', error); // Log the error for debugging
    return NextResponse.json(
      { message: 'Failed to delete session', error },
      { status: 500 },
    );
  }
}

// import { authFetch } from "@/lib/authFetch";
// import { deleteSession } from "@/lib/session";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//     try {
//         // Call the signout endpoint
//         const response = await authFetch(`http://localhost:8080/auth/signout`, {
//             method: "POST",
//         });

//         // If the signout is successful, delete the session
//         if (response.ok) {
//             await deleteSession();
//         }

//         // Redirect to the home page
//         return NextResponse.redirect(new URL("/", req.nextUrl), {
//             headers: {
//                 "Cache-Control": "no-store", // Prevents client-side caching
//             },
//         });
//     } catch (error) {
//         console.error("Failed to delete session:", error); // Log the error for debugging
//         return NextResponse.json(
//             { message: "Failed to delete session", error },
//             { status: 500 }
//         );
//     }
// }
