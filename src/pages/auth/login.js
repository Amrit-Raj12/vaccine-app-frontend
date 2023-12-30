import Link from 'next/link'
import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Login = () => {
  return (
    <main
>
    <section className='bg-cover bg-center'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-white'>
                The Name
            </a>
            <div className='w-full bg-green-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl'>
                        Login Here
                    </h1>
                    <form action="#" className='space-y-4 md:space-y-6'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm font-medium text-green-900 '>
                                Email
                            </label>
                            <input type='text' name='email' id="email" className='bg-green-50 border border-green-300 text-green-900 sm:text-sm rounde-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' placeholder='Email' required/>
                        </div>
                        <div>
                            <label htmlFor='password' className='block mb-2 text-sm font-medium text-green-900 '>
                                Password
                            </label>
                            <input type='password' name='password' id="password" className='bg-green-50 border border-green-300 text-green-900 sm:text-sm rounde-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' placeholder='********' required/>
                        </div>
                        <button type='submit' className='w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Login</button>
                        <p className='text-sm font-light text-green-500'>
                            Not have an account? <Link href='/auth/signup' className='font-medium text-primary-600 hover:underline'>Sign-Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </main>
  )
}

export default Login