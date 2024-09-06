import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.post('/', (req, res) => {
    const { message } = req.body;
    res.send(`Received message: ${message}`);
});

router.get('/api/test', (req, res) => {
    res.send({
        id: 1,
        name: "John Doe",
        age: "30"
    });
});

export default router;
