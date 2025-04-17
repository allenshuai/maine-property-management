import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
)

export async function GET() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('USER:', JSON.stringify(data.users[0], null, 2))


  const users = data.users.map((user: any) => ({
  id: user.id,
  email: user.email,
  full_name: user.user_metadata?.full_name ?? 'Unnamed',
  role: user.user_metadata?.role ?? 'Unknown',
  created_at: user.created_at,
}))

return NextResponse.json({ users }, { status: 200 })


  // return NextResponse.json({ users: data.users }, { status: 200 })
}
