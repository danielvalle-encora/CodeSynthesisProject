import express, { Request, Response } from 'express';
import createDatabaseAndCollection from '../database/task';
import { uuid } from 'uuidv4';
import authToken from '../middleware/authToken';

const router = express.Router();

// Sample data
let tasks: Task[] = [];

// Task interface
interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

// GET all tasks
router.get('/getAll', async (req, res) => {
    const db = await createDatabaseAndCollection();

    if(!db) return;

    const {database} = db;
    if (database)
    {
        const task = await database.collection("task").find().toArray();
        res.json(task);
    }
});

// GET a single task by ID
router.get('/', async (req, res) => {
    const db = await createDatabaseAndCollection();
    if(!db) return;
    const {database} = db;
    if (database)
    {
        const { id } = req.body;
        const task = await database.collection("task").findOne({ id: id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.json(task);
        }
    }

});

// POST a new task
router.post('/', async (req, res) => {
    const db = await createDatabaseAndCollection();

    if(!db) return;

    const {database} = db;
    if (database) // <------- 
    {
        const { title, description, dueDate, status } = req.body;

        const newTask: Task = {
            id: uuid(),
            title,
            description,
            dueDate,
            status,
        };

        await database.collection("task").insertOne(newTask);

        res.status(201).json(newTask);
    }    
});

// PUT (update) an existing task
router.put('/', async (req, res) => {
    const { id } = req.body;
    const { title, description, dueDate, status } = req.body;

    const db = await createDatabaseAndCollection();
    if(!db) return;
    const {database} = db;
    if (database)
    {
        const task = await database.collection("task").findOne({ id: id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            const updatedTask: Task = {
                id: task.id,
                title,
                description,
                dueDate,
                status,
            };

            await database.collection("task").updateOne({ id: id }, { $set: updatedTask });

            res.json(updatedTask);
        }
    }
});

// DELETE a task
router.delete('/', async (req, res) => {
    const db = await createDatabaseAndCollection();
    if(!db) return;
    const {database} = db;
    if (database) {
        const { id } = req.body;
        const task = database.collection("task").findOne({ id: id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            database.collection("task").deleteOne({ id: id });
            res.json({ message: 'Task deleted successfully' });
        }
    }

});

export default router;