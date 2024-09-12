'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  LayoutDashboard, 
  CheckSquare, 
  UserCircle, 
  Settings,
  Clock,
  AlertCircle,
  CheckCircle2,
  LogOut
} from "lucide-react"
import { Toaster, toast } from 'react-hot-toast'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Placeholder data for task summary and notifications
const taskSummary = {
  total: 10,
  pending: 4,
  inProgress: 3,
  completed: 3
}

const notifications = [
  { id: 1, title: 'Project Proposal', dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), status: 'due-soon' },
  { id: 2, title: 'Client Meeting', dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000), status: 'overdue' },
]

// Placeholder user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: '/placeholder.svg'
}

export default function Home() {
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.status === 'due-soon') {
        toast.success(`Task "${notification.title}" is due soon!`, {
          icon: '⏰',
          duration: 5000,
        })
      } else if (notification.status === 'overdue') {
        toast.error(`Task "${notification.title}" is overdue!`, {
          icon: '⚠️',
          duration: 5000,
        })
      }
    })
  }, [])

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...')
    toast.success('Logged out successfully')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Navigation Sidebar */}
      <nav className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        </div>
        <ul className="space-y-2 p-4 flex-grow">
          <li>
            <Link href="/" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/tasks" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <CheckSquare className="mr-2 h-4 w-4" />
                Tasks
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/profile" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/settings" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </li>
        </ul>
        {/* User info and logout */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
        
        {/* Task Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taskSummary.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taskSummary.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taskSummary.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taskSummary.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks List */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {notifications.map(task => (
                <li key={task.id} className="flex justify-between items-center">
                  <span>{task.title}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    task.status === 'due-soon' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {task.status === 'due-soon' ? 'Due Soon' : 'Overdue'}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Toast Container */}
      <Toaster position="bottom-right" />
    </div>
  )
}