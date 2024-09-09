import {Router} from 'express';
import createDatabaseAndCollection from '../database/task';
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Validate password field
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must be 8 characters long, contain one uppercase letter, one number, and one special character' });
        return;
    }

    const db = await createDatabaseAndCollection();
    if(!db) return;

    const {database} = db;
    if (database) // <------- 
    {
        // Check if the email already exists in MongoDB
        const userExists = await database.collection('user').findOne({ email: email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Encrypt the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = { id: uuid(), email: email, password: hashedPassword };
        await database.collection("user").insertOne(user);

        console.log(email, password);
        res.status(201).json({ message: 'Account created successfully' });
    }
});

export default router;