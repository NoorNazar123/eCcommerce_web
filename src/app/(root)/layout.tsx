import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className=" sticky top-0 z-50">
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default layout;
