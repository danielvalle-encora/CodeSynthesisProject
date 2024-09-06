import {Router} from 'express';

const router = Router();

router.post('/insert', (req, res) => {
    const { email, password } = req.body;

    // Validate password field
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must be 8 characters long, contain one uppercase letter, one number, and one special character' });
        return;
    }


    console.log(email, password);
    //res.status(200).json({ message: 'Account created successfully' });
});

export default router;