// app/admin/login/page.tsx
'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Card, CardHeader, CardContent, CardFooter} from '@/components/ui/card'
import {Lock} from 'lucide-react'

export default function AdminLoginPage() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: user, password: pass})
      })

      if (res.ok) router.push('/admin')
      else setErr('Invalid credentials')
    } catch (error) {
      setErr('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-lg border-border/40">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center">
            <Lock className="h-8 w-8"/>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Login</h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentials to access the admin area
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Username
              </label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
                className="h-11"
              />
            </div>
          </form>

          {err && (
            <div
              className="mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
              {err}
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleLogin}
            className="w-full h-11 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            disabled={loading || !user || !pass}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Log in'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
