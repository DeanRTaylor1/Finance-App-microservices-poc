import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';
import { User } from '../models/User';
import { BadRequestError } from '../errors/common';

const router = express.Router();

router.put('/api/users/confirmation', async (req: Request, res: Response) => {
  const { userid } = req.body;
  const user = await User.findById(userid);
  if (!user) {
    throw new BadRequestError('Invalid Token');
  }
  user.confirmed = true;
  await user.save();

  const userJwt = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_KEY!
  );
  //env variable checked in index.ts
  //store in session object
  req.session = { jwt: userJwt };

  res.status(201).send(user);
});

export { router as confirmationRouter };
