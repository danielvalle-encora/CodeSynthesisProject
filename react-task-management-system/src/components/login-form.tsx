'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempted with:', { email, password })
  }

  const handleSignup = () => {
    console.log('Signup requested')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
      <div className="w-full max-w-sm mx-auto space-y-6 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-stone-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-stone-50 border-b-2 border-stone-200 focus:border-stone-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-stone-50 border-b-2 border-stone-200 focus:border-stone-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="text-sm text-right">
            <Link href="/forgot-password" className="text-stone-600 hover:text-stone-800 transition-colors">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full bg-stone-600 hover:bg-stone-700 text-white transition-colors">
            Login
          </Button>
        </form>
        <div className="text-center">
          <span className="text-sm text-stone-600">Don't have an account? </span>
          <Button 
            variant="link" 
            onClick={handleSignup} 
            className="text-sm text-stone-700 hover:text-stone-900 transition-colors p-0"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}