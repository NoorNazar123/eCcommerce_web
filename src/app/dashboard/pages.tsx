import { getSession } from '@/lib/session';
import { Role } from '@/types/type';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const session = await getSession();
  if (!session || !session.user) return redirect('/auth/login');
  if (session.user.role !== Role.ADMIN) redirect('/auth/login');
  console.log('session refresh:', session);

  return <div>Dashboard</div>;
};

export default Dashboard;
