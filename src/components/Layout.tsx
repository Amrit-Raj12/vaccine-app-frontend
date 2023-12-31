import React, { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Inter } from 'next/font/google';
import Sidebar from './Sidebar';

const inter = Inter({ subsets: ['latin'] });

interface MyComponentProps {
  children: ReactNode; // Define the type for children
  // Other props if any
}

const Layout: React.FC<MyComponentProps> = ({ children }) => {
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    setHasToken(!!token);
  }, []);

  return (
    <div className='flex flex-col h-screen w-full'>
      <Header />
      <div className="flex flex-1">
        {hasToken && <Sidebar />}
        <main className={hasToken ? 'flex-1' : 'w-full'}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
