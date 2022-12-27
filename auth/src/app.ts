import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { confirmationRouter } from './routes/confirmation';

const app = express();

// ingress nginx will be sending requests via proxy default behaviour is to reject
app.set('trust proxy', true);

app.use(express.json());

//the code below means that you have to put https:// in your post requests!
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', //require https if we are in prod
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(confirmationRouter);

//not found 404
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
