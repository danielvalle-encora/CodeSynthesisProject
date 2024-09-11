import express from 'express';
import jwt from 'jsonwebtoken';
import { loadConfig } from './config';
import authToken from './middleware/authToken';
import createDatabaseAndCollection from './database/task';
import bcrypt from 'bcrypt';

const app = express();
const port = 3001;
const { accessTokenSecret } = loadConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login route
app.post('/login', async (req, res) => {
    const db = await createDatabaseAndCollection();
    if(!db) return;
    const {database} = db;
    if (database)
    {
        const { email, password } = req.body;

        // Check if the email exists in MongoDB
        const user = await database.collection('user').findOne({ email: email });

        if (user) {

            // Check if password is correct
            if (await bcrypt.compare(password, user!.password)) {
                // Generate a JWT token
                const token = jwt.sign({ email: email }, accessTokenSecret, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Incorrect email or password.' });
            }
        } else {
            res.status(401).json({ message: 'Incorrect email or password.' });
        }
    }

});

// Logout route
app.delete('/logout', (req, res) => {
    // Perform any necessary logout logic
    res.json({ message: 'Logged out successfully' });
});

app.get('/test', (req, res) => {
    res.json("test");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});