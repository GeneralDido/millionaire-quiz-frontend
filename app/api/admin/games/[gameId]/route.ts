// app/api/admin/games/[gameId]/route.ts
import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'

export async function DELETE(
  req: Request,
  {params}: { params: Promise<{ gameId: string }> }
) {
  // Add the same auth check as your generate route
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')?.value
  if (auth !== '1') {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const {gameId} = await params

  // Use the same environment variables as your generate route
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!
  const adminKey = process.env.ADMIN_API_KEY!

  const res = await fetch(
    `${base}/games/${gameId}`, // Match the URL pattern from generate route
    {
      method: 'DELETE',
      headers: {
        'X-Admin-Key': adminKey
      }
    }
  )

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({error: text}, {status: res.status})
  }

  return new NextResponse(null, {status: 204})
}
