'use client';

import Loading from '@/app/loading';
import { getSession } from '@/lib/session';
import { Role } from '@/types/type';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      // If no session, redirect to login
      if (!session || !session.user) {
        redirect('/auth/login');
        return;
      }

      // If not admin, redirect to home
      if (session.user.role !== Role.ADMIN) {
        redirect('/');
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return null; // Prevent rendering if user is not admin
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">Manage products, orders, and users.</p>

      {/* Example Dashboard Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-medium">Total Orders</h2>
          <p className="text-2xl font-bold">125</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-medium">Total Products</h2>
          <p className="text-2xl font-bold">250</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-medium">Total Users</h2>
          <p className="text-2xl font-bold">3,200</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
