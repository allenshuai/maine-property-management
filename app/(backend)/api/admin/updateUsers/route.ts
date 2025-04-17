// import { createClient } from '@supabase/supabase-js'
// import { NextResponse } from 'next/server'

// const supabaseAdmin = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// )

// export async function GET() {
//   const updates = [
//     { id: 'efadee8f-e9e8-43b0-a731-47f28b725ed0', full_name: 'Allen Wang' },
//     { id: '87942548-020e-4409-82d5-4bc608c1da5c', full_name: 'Test User' }
//   ]

//   const results = []

//   for (const user of updates) {
//     const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
//       user_metadata: {
//         full_name: user.full_name
//       }
//     })

//     if (error) {
//       results.push({ user: user.full_name, error: error.message })
//     } else {
//       results.push({ user: user.full_name, status: 'updated' })
//     }
//   }

//   return NextResponse.json(results)
// }
