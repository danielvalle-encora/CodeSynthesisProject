import {Router} from 'express';
import createDatabaseAndCollection from '../database/task';

const router = Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Validate password field
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must be 8 characters long, contain one uppercase letter, one number, and one special character' });
        return;
    }

    // Insert the user into the database
    // const {database} = await createDatabaseAndCollection();

    /*
        assign first to variable, kasi yung data taype nya is

        Promise<{database}> | undefined

        it can be undefined, kaya para macheck natin, assign muna sa variable
    */
    const db = await createDatabaseAndCollection();

    /*
        check if variable is undefined
    */
    if(!db) return;


    /*
        then destructure as usual
    */  
    const {database} = db;

    /*
        baligtad tong condition

        null === false
        undefined === false

        dapat

        if(database) // checks if database is not null AND not undefined
    */
    if (database) // <------- 
    {
        /*  paano tong .collection error */ 
        const user = { id: 1, email: email, password: password };
        await database.collection("user").insertOne(user);

        const test = await database.collection("user").findOne({ email: email });
        console.log(test);
    }

    console.log(email, password);
    res.status(200).json({ message: 'Account created successfully' });
});

export default router;