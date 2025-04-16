'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
// import clsx from 'clsx'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: 'user' } // 👈 assign default role on sign-up
      }
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setSuccessMsg('Account created! Please check your email to confirm.')
      setEmail('')
      setPassword('')
      // Optional: redirect after short delay
      setTimeout(() => {
        router.push('/signin')
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900">Create an Account</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have one?{' '}
            <a href="/signin" className="text-amber-600 hover:underline">
              Sign in here
            </a>
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-6 shadow-sm space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
          {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

          <button
            onClick={handleSignUp}
            className="w-full bg-amber-900 hover:bg-amber-700 text-white py-2 rounded-md text-sm font-medium transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
