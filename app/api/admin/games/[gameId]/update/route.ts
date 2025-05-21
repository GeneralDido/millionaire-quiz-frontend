import {cookies} from 'next/headers'
import {NextResponse} from 'next/server'

export async function PUT(request: Request, {params}: { params: { gameId: string | string[] } }) {
  // Next.js guarantees `params` exists, but the segment might be string|string[]
  const raw = params.gameId
  const gameId = Array.isArray(raw) ? raw[0] : raw

  const cookieStore = await cookies()
  if (cookieStore.get('admin-auth')?.value !== '1') {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

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
  return NextResponse.json(JSON.parse(text), {status: res.status})
}
