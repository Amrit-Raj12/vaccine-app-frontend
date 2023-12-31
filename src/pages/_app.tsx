import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// List of authentication routes
const authRoutes = ['/auth/login', '/auth/signup'];

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setLoading(false);

    // If token is present and the user tries to access an auth route, redirect to home
    if (token && authRoutes.includes(router.pathname)) {
      router.push('/');
    }

    // If token is not present and the current route is not an auth route,
    // redirect to the login page
    if (!token && !authRoutes.includes(router.pathname)) {
      router.push('/auth/login');
    }
  }, [router]);

  // Show a loading indicator or message until the redirection
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in and not on an auth route, redirect to login
  if (!isLoggedIn && !authRoutes.includes(router.pathname)) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
