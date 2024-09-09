import express, {urlencoded, json} from 'express';
import router from './startup/routes';
import { MongoClient } from 'mongodb';
import { loadConfig } from './config';
import createDatabaseAndCollection from './database/task';

const app = express();
const port = 3000;

const { databaseUrl } = loadConfig();  

const client = new MongoClient(databaseUrl);
let conn;
try {
  createDatabaseAndCollection();
} catch(e) {
  console.error(e);
}

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});