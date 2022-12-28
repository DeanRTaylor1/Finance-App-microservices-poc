import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { indexFinancesRouter } from './routes/users';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@deanrtaylor/myfin-common';

const app = express();

// ingress nginx will be sending requests via proxy default behaviour is to reject
app.set('trust proxy', true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', //require https if we are in prod
  })
);
app.use(currentUser);
app.use(indexFinancesRouter);

//not found 404
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
