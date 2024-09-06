import express, {urlencoded, json} from 'express';
import router from './startup/routes';

const app = express();
const port = 3000;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});