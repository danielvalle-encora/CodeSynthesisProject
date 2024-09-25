'use client'

import React, { FC, useState, useEffect } from 'react';
import useTask from './hooks/useTask';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, set } from "date-fns"
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
import { Calendar as CalendarIcon, ArrowUpDown } from "lucide-react"
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
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
}

type Errors = {
  title?: string
  description?: string
  dueDate?: string
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
        dueDate: new Date(date as Date).toLocaleString(),
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

  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const [filterText, setFilterText] = useState('')
  const [filterColumn, setFilterColumn] = useState('')
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
  const [errors, setErrors] = useState<Errors>({})

  const tasksPerPage = 10

  const sortData = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filterData = (items: Task[]) => {
    
    if (filterColumn === 'title') {
      return items.filter(item => item.title.toLowerCase().includes(filterText.toLowerCase()))
    }
    if (filterColumn === 'description') {
      return items.filter(item => item.description.toLowerCase().includes(filterText.toLowerCase()))
    }
    if (filterColumn === 'dueDate') {
      return items.filter(item => item.dueDate.toLowerCase().includes(filterText.toLowerCase()))
    }
    if (filterColumn === 'status') {
      return items.filter(item => item.status.toLowerCase().includes(filterText.toLowerCase()))
    }
    return items;
  }

  // Apply sorting and filtering
  const processedData: Task[] = filterData([...tasks].sort((a, b) => {

    if (sortColumn === 'dueDate') {
      if (sortDirection === 'asc') {
        return new Date(a[sortColumn]).getTime() - new Date(b[sortColumn]).getTime()
      } else {
        return new Date(b[sortColumn]).getTime() - new Date(a[sortColumn]).getTime()
      }
    }
    else {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    }
  }))

  // Pagination
  const totalPages = Math.ceil(processedData.length / tasksPerPage)
  const paginatedData = processedData.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  )

  const validateForm = () => {
    let newErrors: Errors = {}

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: any) => {
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

    if (mode === 'update') {
      setFormData({
        title: task?.title || '',
        description: task?.description || '',
        dueDate: task?.dueDate || '',
        status: task?.status || ''
      })
    }
  }

  const handleFilterColumnChange = (e: string) => {
    setFilterText('')
    setFilterColumn(e)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentTask(null)
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Maintenance</h1>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <div className="max-w-sm mb-4 mr-2">
              <Select
                onValueChange={handleFilterColumnChange} 
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a column filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="description">Description</SelectItem>
                  <SelectItem value="dueDate">dueDate</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="max-w-sm mb-4"
            />
          </div>
          <Button onClick={() => openModal('insert')} className="mb-4">Add New Task</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => sortData('title')} className="cursor-pointer">Title <ArrowUpDown className="inline ml-2 h-4 w-4" /></TableHead>
              <TableHead onClick={() => sortData('description')} className="cursor-pointer">Description <ArrowUpDown className="inline ml-2 h-4 w-4" /></TableHead>
              <TableHead onClick={() => sortData('dueDate')} className="cursor-pointer">Due Date <ArrowUpDown className="inline ml-2 h-4 w-4" /></TableHead>
              <TableHead onClick={() => sortData('status')} className="cursor-pointer">Status <ArrowUpDown className="inline ml-2 h-4 w-4" /></TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((task) => (
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