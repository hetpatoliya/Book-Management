import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { config } from 'dotenv';
config();
import db from './src/db/dbConnection';
import express from 'express';
import container from "./inversify.config";

const port = process.env.PORT;
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(express.json());
});

const app = server.build();

db.on('error', console.error.bind(console, 'Error'));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});