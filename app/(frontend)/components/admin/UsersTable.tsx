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
      try {
        const res = await fetch('/api/admin/getusers')
        const json = await res.json()
        console.log('✅ Fetched users:', json.users)
        setUsers(json.users ?? [])
      } catch (err) {
        console.error('❌ Failed to fetch users:', err)
      } finally {
        setLoading(false)
      }
    }
  
    fetchUsers()
  }, [])
  

  if (loading) return <p>Loading users...</p>

  if (!users.length) return <p className="text-gray-500">No users found.</p>

  return (
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
          <tr key={user.id}>
            <td className="px-4 py-2 border">{user.email}</td>
            <td className="px-4 py-2 border">
              {user.user_metadata?.role ?? 'unknown'}
            </td>
            <td className="px-4 py-2 border">
              {new Date(user.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

}
