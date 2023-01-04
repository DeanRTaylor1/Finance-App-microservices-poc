import express, { Request, Response } from 'express';
import { currentUser, requireAuth } from '@deanrtaylor/myfin-common';
import { User } from '../models/user-model';

const router = express.Router();

router.post(
  '/api/finances',
  requireAuth, 
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const userData = await User.findByEmail(email);

    res.send(userData);
  }
);

export { router as indexFinancesRouter };
