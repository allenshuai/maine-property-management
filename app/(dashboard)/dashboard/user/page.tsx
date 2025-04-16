'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function UserDashboard() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const role = data.user?.user_metadata?.role
      if (role !== 'user') router.push('/signin') // protect route
    })
  }, [])

  return <div className="p-8 text-2xl">Welcome User</div>
}
