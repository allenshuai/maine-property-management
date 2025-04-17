'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { FaSearch, FaUserPlus } from 'react-icons/fa'


interface CustomUser {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
}

export default function UsersTable() {
  const [users, setUsers] = useState<CustomUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/getusers')
        const json = await res.json()
        setUsers(json.users ?? [])
      } catch (err) {
        console.error('Failed to fetch users:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Loading users...</p>
  if (!users.length) return <p className="text-gray-500">No users found.</p>

  return (
    <div className="bg-white shadow-xs border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="text-xl font-regular">Total Members: {users.length}</h2>
       
        <div className="flex gap-2 items-center">
          <div className="relative ">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-3 py-1.5 border border-gray-200 rounded-md text-sm"
            />
          </div>

          <button
            className="bg-white text-gray-700 px-3 py-1.5 border border-gray-200 rounded-md text-sm flex items-center gap-2"
            disabled
          >
            <FaUserPlus />
            Invite new member
          </button>
        </div>

      </div>
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-t border-b border-gray-200 text-left">
          <tr className="text-gray-600">
            <th className="px-4 py-4 font-light">User</th>
            <th className="px-4 py-4 font-light">Email</th>
            <th className="px-4 py-4 font-light">Role</th>
            <th className="px-4 py-4 font-light">Date Joined</th>
            <th className="px-4 py-4 font-light">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="text-gray-700 text-sm">
              <td className="px-4 py-4 font-semibold">{user.full_name}</td>
              <td className="px-4 py-4 font-light">{user.email}</td>
              <td className="px-4 py-4 font-light capitalize">{user.role}</td>
              <td className="px-4 py-4 font-light">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 font-light text-gray-400">...</td>
            </tr>
          ))}
        </tbody>

      </table>
      
    </div>
    
  )
}
