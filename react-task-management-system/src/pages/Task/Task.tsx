'use client'

import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

type Task = {
    id: number
    title: string
    description: string
    //status: 'pending' | 'in-progress' | 'completed'
}

const Task: FC = () => {

    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {

        axios.get('/api/task/getAll')
            .then(function (response) {
                console.log(response.data);
                setTasks(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // const [tasks, setTasks] = useState<Task[]>([
    //     { id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' },
    //     { id: 2, title: 'Task 2', description: 'Description 2', status: 'in-progress' },
    //     { id: 3, title: 'Task 3', description: 'Description 3', status: 'completed' },
    //     // Add more mock tasks here
    //   ])


    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'insert' | 'update' | 'view'>('insert')
    const [currentTask, setCurrentTask] = useState<Task | null>(null)

    const tasksPerPage = 5
    const indexOfLastTask = currentPage * tasksPerPage
    const indexOfFirstTask = indexOfLastTask - tasksPerPage
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

    const totalPages = Math.ceil(tasks.length / tasksPerPage)

    const openModal = (mode: 'insert' | 'update' | 'view', task?: Task) => {
        setModalMode(mode)
        setCurrentTask(task || null)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentTask(null)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newTask: Task = {
            id: currentTask?.id || tasks.length + 1,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            //status: formData.get('status') as 'pending' | 'in-progress' | 'completed',
        }

        // if (modalMode === 'insert') {
        //     setTasks([...tasks, newTask])
        // } else if (modalMode === 'update') {
        //     setTasks(tasks.map(task => task.id === newTask.id ? newTask : task))
        // }

        closeModal()
    }

    return (
        <>
            <table>
            {
                tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  {/* <TextDecoderStream>
                    <Button onClick={() => openModal('view', task)} className="mr-2">View</Button>
                    <Button onClick={() => openModal('update', task)}>Edit</Button>
                  </TableCtdell> */}
                </tr>
              ))
              }
            </table>
        </>
        // <div className="container mx-auto p-4">
        //   <h1 className="text-2xl font-bold mb-4">Task Maintenance</h1>
        //   <Button onClick={() => openModal('insert')} className="mb-4">Add New Task</Button>

        //   <Table>
        //     <TableHeader>
        //       <TableRow>
        //         <TableHead>ID</TableHead>
        //         <TableHead>Title</TableHead>
        //         <TableHead>Status</TableHead>
        //         <TableHead>Actions</TableHead>
        //       </TableRow>
        //     </TableHeader>
        //     <TableBody>
        //       {currentTasks.map((task) => (
        //         <TableRow key={task.id}>
        //           <TableCell>{task.id}</TableCell>
        //           <TableCell>{task.title}</TableCell>
        //           <TableCell>{task.status}</TableCell>
        //           <TableCell>
        //             <Button onClick={() => openModal('view', task)} className="mr-2">View</Button>
        //             <Button onClick={() => openModal('update', task)}>Edit</Button>
        //           </TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>

        //   <Pagination className="mt-4">
        //     <PaginationContent>
        //       <PaginationItem>
        //         <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
        //       </PaginationItem>
        //       {[...Array(totalPages)].map((_, index) => (
        //         <PaginationItem key={index}>
        //           <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
        //             {index + 1}
        //           </PaginationLink>
        //         </PaginationItem>
        //       ))}
        //       <PaginationItem>
        //         <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
        //       </PaginationItem>
        //     </PaginationContent>
        //   </Pagination>

        //   <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        //     <DialogContent>
        //       <DialogHeader>
        //         <DialogTitle>{modalMode === 'insert' ? 'Add New Task' : modalMode === 'update' ? 'Edit Task' : 'View Task'}</DialogTitle>
        //       </DialogHeader>
        //       <form onSubmit={handleSubmit}>
        //         <div className="grid gap-4 py-4">
        //           <div className="grid grid-cols-4 items-center gap-4">
        //             <Label htmlFor="title" className="text-right">
        //               Title
        //             </Label>
        //             <Input
        //               id="title"
        //               name="title"
        //               defaultValue={currentTask?.title}
        //               className="col-span-3"
        //               readOnly={modalMode === 'view'}
        //             />
        //           </div>
        //           <div className="grid grid-cols-4 items-center gap-4">
        //             <Label htmlFor="description" className="text-right">
        //               Description
        //             </Label>
        //             <Input
        //               id="description"
        //               name="description"
        //               defaultValue={currentTask?.description}
        //               className="col-span-3"
        //               readOnly={modalMode === 'view'}
        //             />
        //           </div>
        //           <div className="grid grid-cols-4 items-center gap-4">
        //             <Label htmlFor="status" className="text-right">
        //               Status
        //             </Label>
        //             <select
        //               id="status"
        //               name="status"
        //               defaultValue={currentTask?.status}
        //               className="col-span-3"
        //               disabled={modalMode === 'view'}
        //             >
        //               <option value="pending">Pending</option>
        //               <option value="in-progress">In Progress</option>
        //               <option value="completed">Completed</option>
        //             </select>
        //           </div>
        //         </div>
        //         <DialogFooter>
        //           {modalMode !== 'view' && (
        //             <Button type="submit">{modalMode === 'insert' ? 'Add Task' : 'Update Task'}</Button>
        //           )}
        //           <Button type="button" onClick={closeModal} variant="outline">
        //             Close
        //           </Button>
        //         </DialogFooter>
        //       </form>
        //     </DialogContent>
        //   </Dialog>
        // </div>
    )
};

export default Task;