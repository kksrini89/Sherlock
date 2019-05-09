import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getTransactionById, getTransactions } from './controllers/api';

const app: any = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200
  })
);
app.get('/', async (req: Request, res: Response) => res.json({ result: `It works!` }));
app.get('/api/transaction', getTransactions);
app.get('/api/transaction/:id', getTransactionById);

export default app;
