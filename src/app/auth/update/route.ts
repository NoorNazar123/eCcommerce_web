import { NextResponse } from 'next/server';
import { updateTokens } from '@/lib/session';

export async function POST(request: Request) {
  const { accessToken, refreshToken, user } = await request.json();

  try {
    await updateTokens({ accessToken, refreshToken, user });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update tokens:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update tokens' },
      { status: 500 },
    );
  }
}

// import { updateTokens } from "@/lib/session";
// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//     const body = await req.json();
//     console.log("Received99999", body);

//     const { accessToken, refreshToken, user } = body;

//     if (!accessToken || !refreshToken)
//         return new Response("Provide Tokens", { status: 401 });

//     await updateTokens({ accessToken, refreshToken, user });
//     console.log("Tokens updated successfully.");

//     return new Response("OK", { status: 200 });
// }

// export async function POST(req: NextRequest) {
//     const body = await req.json();
//     const { accessToken, refreshToken } = body;

//     if (!accessToken || !refreshToken)
//         return new Response("Provide Tokens", { status: 401 });

//     await updateTokens({ accessToken, refreshToken });

//     return new Response("OK", { status: 200 });
// }
