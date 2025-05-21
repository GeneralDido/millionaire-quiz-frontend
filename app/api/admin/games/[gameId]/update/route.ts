import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'

export async function PUT(
  req: Request,
  {params}: { params: { gameId: string } }
) {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')?.value
  if (auth !== '1') {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const {gameId} = params
  const body = await req.json()
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
