import { getSession } from '@/lib/session';
import { Role } from '@/types/type';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminDashboard = async () => {
  const session = await getSession();

  // Check if the user is logged in
  if (!session || !session.user) {
    redirect('/auth/login'); // Redirect unauthorized users
  }

  // Check if the user is an ADMIN
  if (session.user.role !== Role.ADMIN) {
    redirect('/'); // Redirect non-admin users to the home page
  }

  return <div>Welcome, Admin! This is your dashboard.</div>;
};

export default AdminDashboard;
