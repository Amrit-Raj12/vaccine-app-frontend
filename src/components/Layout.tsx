import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Inter } from 'next/font/google'
import Sidebar from './Sidebar'

const inter = Inter({ subsets: ['latin'] })

interface MyComponentProps {
  children: ReactNode; // Define the type for children
  // Other props if any
}

const Layout : React.FC<MyComponentProps> =  ({ children }) => {
  return (
    <div className='flex flex-col h-screen w-full'>
        <Header />
        <div className="flex flex-1">
        <Sidebar />
        <main className='flex-1'>
            {children}
        </main>
        </div>
        <Footer />
    </div>
  )
}

export default Layout