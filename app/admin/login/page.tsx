// app/admin/login/page.tsx
'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

export default function AdminLoginPage() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  async function handleLogin() {
    setErr('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: user, password: pass})
    })
    if (res.ok) router.push('/admin')
    else setErr('Invalid credentials')
  }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <Input
        placeholder="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <Button onClick={handleLogin}>Log in</Button>
      {err && <p className="text-red-600">{err}</p>}
    </div>
  )
}
