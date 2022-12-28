import express, { Request, Response } from 'express';
import { requireAuth } from '@deanrtaylor/myfin-common';
import { User } from '../models/user-model';

const router = express.Router();

router.get(
  '/api/finances',
  requireAuth,
  async (req: Request, res: Response) => {
    console.log('testing...');

    const users = await User.find();

    res.send(users);
  }
);

export { router as indexFinancesRouter };
