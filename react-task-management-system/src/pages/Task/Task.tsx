'use client'

import React, { FC, useState, useEffect } from 'react';
import useTask from './hooks/useTask';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Task = {
  id: string
  title: string
  description: string
  dueDate: Date
  status: 'pending' | 'in-progress' | 'completed'
}

const Task: FC = () => {

  const { tasks, fetchTasks, insertTask, updateTask } = useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (validateForm()) {
      const formData = new FormData(event.currentTarget)
      const currTask: Task = {
        id: currentTask?.id || "",
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        dueDate: date as Date,
        status: formData.get('status') as 'pending' | 'in-progress' | 'completed',
      }

      if (modalMode === 'insert') {
        insertTask(currTask);
      }
      else if (modalMode === 'update') {
        updateTask(currTask)
      }

      closeModal()
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCalendarDisabled, setIsCalendarDisabled] = useState(false)
  const [date, setDate] = useState<Date>()
  const [modalMode, setModalMode] = useState<'insert' | 'update' | 'view'>('insert')
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: ''
  })
  const [errors, setErrors] = useState({})

  const tasksPerPage = 10
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

  const totalPages = Math.ceil(tasks.length / tasksPerPage)

  const validateForm = () => {
    let newErrors = {}

    console.log(formData.title)
    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    // Password validation
    if (!date) {
      newErrors.dueDate = 'Due Date is required'
    }

    console.log(newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const openModal = (mode: 'insert' | 'update' | 'view', task?: Task) => {
    setErrors({})
    setModalMode(mode)
    setCurrentTask(task || null)
    setIsModalOpen(true)
    setIsCalendarDisabled(mode === 'view')
    setDate(task ? new Date(task.dueDate) : undefined)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentTask(null)
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Maintenance</h1>
        <Button onClick={() => openModal('insert')} className="mb-4">Add New Task</Button>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{format(task.dueDate, "MMMM dd, yyyy")}</TableCell>
                <TableCell>
                  {
                    task.status == 'pending' ? 'Pending' :
                    task.status == 'in-progress' ? 'In Progress' :
                    task.status == 'completed' ? 'Completed' : ''
                  }
                </TableCell>
                <TableCell>
                  <Button onClick={() => openModal('view', task)} className="mr-2">View</Button>
                  <Button onClick={() => openModal('update', task)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{modalMode === 'insert' ? 'Add New Task' : modalMode === 'update' ? 'Edit Task' : 'View Task'}</DialogTitle>
            </DialogHeader>
            <DialogDescription hidden={true} />
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="items-center">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={currentTask?.title}
                    onChange={handleChange}
                    className={errors.title ? "col-span-3 border-red-500" : " col-span-3"}
                    disabled={modalMode === 'view'}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className="items-center">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    defaultValue={currentTask?.description}
                    onChange={handleChange}
                    className={errors.description ? "col-span-3 border-red-500" : " col-span-3"}
                    disabled={modalMode === 'view'}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div className="items-center">
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={errors.dueDate ? 
                                    cn("w-[460px] justify-start text-left font-normal col-span-3 border-red-500",
                                    !date && "text-muted-foreground") : 
                                    cn("w-[460px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground")}
                        disabled={isCalendarDisabled}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={isCalendarDisabled ? undefined : setDate}
                        initialFocus
                        disabled={isCalendarDisabled}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                </div>
                <div className="items-center">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    name="status"
                    defaultValue={currentTask?.status}
                    className="col-span-3"
                    disabled={modalMode === 'view'}
                  >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>  
                  <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                    {/* <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option> */}
                  </Select>
                </div>
              </div>
              <DialogFooter>
                {modalMode !== 'view' && (
                  <Button type="submit">{modalMode === 'insert' ? 'Add Task' : 'Update Task'}</Button>
                )}
                <Button type="button" onClick={closeModal} variant="outline">
                  Close
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
};

export default Task;