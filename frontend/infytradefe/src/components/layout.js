import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
