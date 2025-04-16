'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import clsx from 'clsx'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      const userRole = data.user?.user_metadata?.role ?? role
      router.push(role === 'admin' ? '/admin' : '/user')
    }
  }


  return (
    <div
      className={clsx(
        'min-h-screen flex transition-colors duration-500',
        role === 'admin' ? 'bg-black' : 'bg-white'
      )}
    >
      {/* Left Panel */}
      <div className="flex-1 px-10 py-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-left mb-8 space-x-4">
            <button
              className={clsx(
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border cursor-pointer',
                role === 'user'
                  ? 'bg-amber-900 text-white'
                  : 'bg-transparent text-gray-500 border-gray-400 hover:text-white hover:border-white'
              )}
              onClick={() => setRole('user')}
            >
              User
            </button>
            <button
              className={clsx(
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border cursor-pointer',
                role === 'admin'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-300 border-gray-400 hover:text-gray-700 hover:border-black'
              )}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
          </div>

          <h1
            className={clsx(
              'text-3xl font-bold mb-2 text-left',
              role === 'admin' ? 'text-white' : 'text-black'
            )}
          >
            Log in as {role === 'admin' ? 'Admin' : 'User'}
          </h1>
    
  

          <div className={clsx('text-left text-sm mb-4', role === 'admin' ? 'text-gray-400' : 'text-gray-500')}>
            Welcome back!
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className={clsx(
                'w-full border px-4 py-2 rounded-md bg-transparent',
                role === 'admin'
                  ? 'text-white placeholder-gray-400 border-gray-600'
                  : 'text-black placeholder-gray-400 border-gray-300'
              )}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={clsx(
                'w-full border px-4 py-2 rounded-md bg-transparent',
                role === 'admin'
                  ? 'text-white placeholder-gray-400 border-gray-600'
                  : 'text-black placeholder-gray-400 border-gray-300'
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            {/* <a href="#" className="text-blue-400">Forgot Password?</a> */}
          </div>

          <button
            onClick={handleSignIn}
            className="mt-6 w-full bg-amber-900 hover:bg-amber-500 text-white py-2 rounded-md text-sm font-medium cursor-pointer"
          >
            Log In
          </button>

          <p className="text-left text-sm mt-4 text-gray-500">
            Do not have an account?{' '}
            <a href="/signup" className="text-amber-600">Create an account</a>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex flex-1 items-center justify-center transition-colors duration-500">
        <div className="text-center px-8">
          <h2
            className={clsx(
              'text-2xl font-semibold mb-4',
              role === 'admin' ? 'text-white' : 'text-black'
            )}
          >
            Connect with every application.
          </h2>
          <p
            className={clsx(
              'text-sm',
              role === 'admin' ? 'text-white/70' : 'text-gray-600'
            )}
          >
            Everything you need in an easily customizable dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
