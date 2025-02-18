import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Footer from '@/components/Footer';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardHeader />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
