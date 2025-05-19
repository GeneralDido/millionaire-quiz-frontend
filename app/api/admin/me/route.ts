// app/api/admin/me/route.ts
import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get('admin-auth')?.value === '1') {
    return NextResponse.json({ok: true})
  }
  return NextResponse.json({ok: false}, {status: 401})
}
