import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { message, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (email && password) {
      login(email, password);
    }
  }
  
  const handleSignup = () => {
      navigate('/signup');
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
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 bg-stone-50 border-b-2 border-stone-200 focus:border-stone-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full px-3 py-2 bg-stone-50 border-b-2 border-stone-200 focus:border-stone-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="text-sm text-right">
            <Button variant="link" className="text-stone-600 hover:text-stone-800 transition-colors">
              Forgot password?
            </Button>
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
};

export default Login;