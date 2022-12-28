import express, { Request, Response } from 'express';
import { requireAuth } from '@deanrtaylor/myfin-common';
import { UserRepo } from '../repos/user-repo';

const router = express.Router();

router.get(
  '/api/finances',
  requireAuth,
  async (req: Request, res: Response) => {
    console.log('testing...');

    const users = await UserRepo.find();

    res.send(users);
  }
);

export { router as indexFinancesRouter };
