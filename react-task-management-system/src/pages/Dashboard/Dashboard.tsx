import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import useTask from '@/pages/Task/hooks/useTask';

const Dashboard: React.FC = () => {

  const { dashboard, getDashboardData, recentTasks, getRecentTasks } = useTask();

  useEffect(() => {
    getDashboardData();
    getRecentTasks();
  }, [])

  const notifications = [
    { id: 1, title: 'Project Proposal', dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), status: 'due-soon' },
    { id: 2, title: 'Client Meeting', dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000), status: 'overdue' },
  ]

  return (
    <>
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
              <div className="text-2xl font-bold">{dashboard.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboard.completed}</div>
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
              {recentTasks.map(task => (
                <li key={task.id} className="flex justify-between items-center">
                  <span>{task.title}</span>
                  <span className=
                    {
                      `px-2 py-1 rounded-full text-sm 
                    ${task.status === 'due-soon' ? 'bg-orange-200 text-orange-800' :
                        task.status === 'overdue' ? 'bg-red-200 text-red-800' :
                          task.status === 'completed' ? 'bg-green-200 text-green-800' :
                            task.status === 'in-progress' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`
                    }>
                    {
                      task.status === 'due-soon' ? 'Due Soon' :
                        task.status === 'overdue' ? 'Overdue' :
                          task.status === 'completed' ? 'Completed' :
                            task.status === 'in-progress' ? 'In Progress' : 'Pending' }
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

export default Dashboard;