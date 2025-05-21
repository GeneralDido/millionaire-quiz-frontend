// app/api/admin/games/[gameId]/update/route.ts
import {NextRequest, NextResponse} from 'next/server'
import {cookies} from 'next/headers'

export async function PUT(
  request: NextRequest,
  {params}: { params: { gameId: string } }
) {
  // --- auth check ---
  const cookieStore = await cookies()
  if (cookieStore.get('admin-auth')?.value !== '1') {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  // pull out the single string param
  const {gameId} = params

  // forward the admin’s JSON body to your backend
  const body = await request.json()
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!
  const adminKey = process.env.ADMIN_API_KEY!

  const res = await fetch(`${base}/games/${gameId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': adminKey
    },
    body: JSON.stringify(body)
  })

  const text = await res.text()
  if (!res.ok) {
    return NextResponse.json({error: text || 'Update failed'}, {status: res.status})
  }
  // parse the backend’s JSON-string payload and return
  return NextResponse.json(JSON.parse(text), {status: res.status})
}
