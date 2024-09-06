import express from 'express';
import jwt from 'jsonwebtoken';
import { loadConfig } from './config';
import authToken from './middleware/authToken';

const app = express();
const port = 3001;
const { accessTokenSecret } = loadConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login route
app.post('/login', (req, res) => {
    // Check if the username and password are valid
    const { email, password } = req.body;
    if (email === 'admin' && password === 'password') {
        // Generate a JWT token
        const token = jwt.sign({ email: email }, accessTokenSecret, { expiresIn: '15s' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Logout route
app.delete('/logout', (req, res) => {
    // Perform any necessary logout logic
    res.json({ message: 'Logged out successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});