import React, { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Inter } from 'next/font/google';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const inter = Inter({ subsets: ['latin'] });

interface RootState {
  userStore: {
    mainUser: {
      token: {
        accessToken: string
      }
    };
  };
}

interface MyComponentProps {
  children: ReactNode; // Define the type for children
  // Other props if any
}

const Layout: React.FC<MyComponentProps> = ({ children }) => {
 
  const {accessToken} = useSelector((state: RootState) => state.userStore.mainUser.token)

  return (
    <div className='flex flex-col h-screen w-full'>
      <Header />
      <div className="flex flex-1">
        {accessToken && <Sidebar />}
        <main className={accessToken ? 'flex-1' : 'w-full'}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
