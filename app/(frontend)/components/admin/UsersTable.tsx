'use client'

import { useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  user_metadata?: {
    role?: string
  }
  created_at: string
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/admin/get-users')
      const json = await res.json()
      setUsers(json.users)
      setLoading(false)
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Loading users...</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.user_metadata?.role ?? 'unknown'}</td>
              <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
