import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Inter } from 'next/font/google';
import Sidebar from './Sidebar';
import Cookies from 'js-cookie';

const inter = Inter({ subsets: ['latin'] });

// interface RootState {
//   userStore: {
//     mainUser: {
//       token: {
//         accessToken: string
//       }
//     };
//   };
// }

interface MyComponentProps {
  children: ReactNode; 
}

const Layout: React.FC<MyComponentProps> = ({ children }) => {
  
  const getAccessToken = () => {
    return Cookies.get('accessToken');
  };


  return (
    <div className='flex flex-col h-screen w-full'>
      <Header />
      <div className="flex flex-1">
        {getAccessToken() && <Sidebar />}
        <main className={getAccessToken() ? 'flex-1' : 'w-full'}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
