import { MongoClient, Db } from 'mongodb';
import { loadConfig } from '../config';

async function createDatabaseAndCollection() {
    const { databaseUrl } = loadConfig();
    const client = new MongoClient(databaseUrl);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const databaseName = 'task-management';
        const database: Db = client.db(databaseName);
        console.log(`Created database: ${databaseName}`);

        const userCollection  = 'user';
        await database.createCollection(userCollection);
        console.log(`Created collection: ${userCollection}`);

        const taskCollection = 'task';
        await database.createCollection(taskCollection);
        console.log(`Created collection: ${taskCollection}`);

        // insert data in user collection
        // const user = { id: 1, email: 'admin', password: 'password' };
        // database.collection(userCollection).insertOne(user);

        return { database };

    } catch (error) {
        console.error('Error:', error);
    }
    // } finally {
    //     await client.close();
    //     console.log('Disconnected from MongoDB');
    // }
}

export default createDatabaseAndCollection;