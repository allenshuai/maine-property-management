import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
)

export async function POST(req: NextRequest) {
  const { userId, role } = await req.json()

  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { role }
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: `User ${userId} updated to ${role}`, data })
}
