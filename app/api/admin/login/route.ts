// app/api/admin/login/route.ts
import {NextResponse} from 'next/server'

export async function POST(req: Request) {
  const {username, password} = await req.json()
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const res = NextResponse.json({ok: true})
    res.cookies.set('admin-auth', '1', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2 // 2h
    })
    return res
  }
  return NextResponse.json({error: 'Invalid credentials'}, {status: 401})
}
