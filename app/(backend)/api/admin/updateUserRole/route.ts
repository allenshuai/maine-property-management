import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const updates = [
    { id: '44aabfa9-4860-47b8-bb53-97a5f03e0ab8', role: 'admin' },
    // { id: '87942548-020e-4409-82d5-4bc608c1da5c', role: 'user' }
  ]

  const results = []

  for (const user of updates) {
    // const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      user_metadata: {
        role: user.role
      }
    })

    if (error) {
      results.push({ user: user.id, error: error.message })
    } else {
      results.push({ user: user.id, role: user.role, status: 'updated' })
    }
  }

  return NextResponse.json(results)
}
