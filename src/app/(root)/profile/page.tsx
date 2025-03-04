'use client';

import React, { useEffect, useState } from 'react';
import { getProfile } from '@/lib/action';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Initialize as true to indicate loading
  const [error, setError] = useState(''); // Initialize as null for no error

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile. please refrsh the pages');
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  if (error) {
    return <div>{error}</div>; // Render error state
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <pre>{JSON.stringify(profile, null, 2)}</pre> // Display profile data
      ) : (
        <div>No profile data available.</div>
      )}
    </div>
  );
};

export default ProfilePage;

// 'use client';

// import { useState, useEffect } from 'react';
// import { getProfile } from '@/lib/action';
// import Loading from '@/app/loading';
// import { getSession } from '@/lib/session';
// import { Role } from '@/types/type';
// import { redirect } from 'next/navigation';

// const ProfilePage = () => {
//   const [isAdmin, setIsAdmin] = useState(false);

//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const checkSession = async () => {
//       const session = await getSession();

//       // If no session, redirect to login
//       if (!session || !session.user) {
//         redirect('/auth/login');
//         return;
//       }

//       // If not admin, redirect to home
//       if (session.user.role !== Role.ADMIN) {
//         return <div>only Admin can access</div>;
//         redirect('/');
//         return;
//       }

//       setIsAdmin(true);
//       setLoading(false);
//     };

//     checkSession();
//   }, []);

//   if (loading) {
//     return <Loading size="w-[50px] h-[50px]" />;
//   }

//   if (!isAdmin) {
//     return <div>'only Admin can acess'</div>; // Prevent rendering if user is not admin
//   }

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await getProfile();
//         setProfile(res);
//       } catch (error: any) {
//         setError(error.message || 'Failed to fetch profile.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <Loading size="w-[50px] h-[50px]" />;
//   }

//   return (
//     <div className="min-h-screen py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

//         {error ? (
//           <div className=" border border-red-400 text-red-700 px-4 py-3 rounded-md">
//             <p>Error: {error}</p>
//             <p>Only admins can access this page.</p>
//           </div>
//         ) : profile ? (
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <div className="px-4 py-5 sm:px-6">
//               <h2 className="text-lg leading-6 font-medium text-gray-900">
//                 Profile Information
//               </h2>
//               <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                 Personal details and information.
//               </p>
//             </div>
//             <div className="border-t border-gray-200">
//               <dl>
//                 <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">
//                     Full Name
//                   </dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     {profile.name || 'N/A'}
//                   </dd>
//                 </div>
//                 <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">Email</dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     {profile.email || 'N/A'}
//                   </dd>
//                 </div>
//                 <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">Role</dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     {profile.role || 'N/A'}
//                   </dd>
//                 </div>
//                 <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">
//                     Joined On
//                   </dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     {new Date(profile.createdAt).toLocaleDateString() || 'N/A'}
//                   </dd>
//                 </div>
//               </dl>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md">
//             <p>You cannot access this page. Please log in.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
