import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const updates = [
    { id: '92314313-92c8-4ca7-837c-f9e332a7e1fb', full_name: 'Bruce Wayne' },
    // { id: '87942548-020e-4409-82d5-4bc608c1da5c', full_name: 'Test User' }
  ]

  const results = []

  for (const user of updates) {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      user_metadata: {
        full_name: user.full_name
      }
    })

    if (error) {
      results.push({ user: user.full_name, error: error.message })
    } else {
      results.push({ user: user.full_name, status: 'updated' })
    }
  }

  return NextResponse.json(results)
}
