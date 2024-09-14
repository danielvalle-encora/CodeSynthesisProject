import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';

interface Task {
    id: string,
    title: string;
    description: string;
    dueDate: Date;
    status: 'pending' | 'in-progress' | 'completed';
    userId: string;
}

interface Dashboard {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
}

export default function useTask() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [dashboard, setDashboard] = useState<Dashboard>({ total: 0, pending: 0, inProgress: 0, completed: 0 });
    const { id } = useAppSelector(state => state.currentUser)

    const fetchTasks = async () => {

        axios.post('/api/task/getAll', { id })
            .then(function (response) {
                setTasks(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const insertTask = async (Task: any) => {
        console.log(id)
        axios.post("/api/task", {
            title: Task.title,
            description: Task.description,
            dueDate: Task.dueDate,
            status: Task.status,
            userId: id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                setTasks([...tasks, Task]);
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    const updateTask = async (Task: any) => {

        axios.put("/api/task", {
            id: Task.id,
            title: Task.title,
            description: Task.description,
            dueDate: Task.dueDate,
            status: Task.status,
            userId: id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                setTasks([...tasks.map(task => task.id === Task.id ? Task : task)]);
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    const getDashboardData = async () => {

        axios.post('/api/task/getAll', { id })
            .then(function (response) {
                const userTasks = response.data;

                const total = userTasks.length;
                const pending = userTasks.filter((task: Task) => task.status === 'pending').length;
                const inProgress = userTasks.filter((task: Task) => task.status === 'in-progress').length;
                const completed = userTasks.filter((task: Task) => task.status === 'completed').length;

                setDashboard({ total, pending, inProgress, completed });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return { tasks, dashboard, fetchTasks, insertTask, updateTask, getDashboardData }
}