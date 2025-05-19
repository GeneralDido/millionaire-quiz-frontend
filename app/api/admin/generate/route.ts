// app/api/admin/generate/route.ts
import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')?.value
  if (auth !== '1') {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const base = process.env.NEXT_PUBLIC_API_BASE_URL!
  const resp = await fetch(`${base}/games/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': process.env.ADMIN_API_KEY!
    },
    body: await request.text()
  })

  const payload = await resp.json()
  return NextResponse.json(payload, {status: resp.status})
}
