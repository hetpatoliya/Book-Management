import { config } from 'dotenv';
config();
import db from './db/dbConnection';
import express from 'express';

const app = express();
const port = process.env.PORT;

app.use(express.json());
db.on('error', console.error.bind(console, 'Error'));

import adminRoute from './routes/admin.route';
import authorRoute from './routes/author.route';
import bookRoute from './routes/book.route';
import categoryRoute from './routes/category.route';

app.use('/', adminRoute);
app.use('/', authorRoute);
app.use('/', bookRoute);
app.use('/', categoryRoute);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});