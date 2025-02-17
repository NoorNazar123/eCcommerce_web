"use server";

import { authFetch } from "./authFetch";

export const getProfile = async () => {
  const response = await authFetch(`http://localhost:8080/auth/protected`);

  const result = await response.json();
  console.log("Profile API Response:", result); // ✅ Debugging step
  return result;
};
// export const getProfile = async () => {
//     const session = await getSession();

//     console.log("Session Data:", session); // Debugging

//     if (!session?.accessToken) {
//         throw new Error("No access token available");
//     }

//     try {
//         const response = await fetch(`http://localhost:8080/auth/protected`, {
//             headers: {
//                 authorization: `Bearer ${session.accessToken}`,
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`Error ${response.status}: ${await response.text()}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Failed to fetch profile:", error);
//         throw error;
//     }
// };
