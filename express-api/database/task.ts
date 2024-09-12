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

        return { database };

    } catch (error) {
        console.error('Error:', error);
    }
}

export default createDatabaseAndCollection;