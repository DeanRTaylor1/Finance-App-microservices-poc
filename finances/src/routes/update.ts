import express, { Request, Response } from "express";
import { requireAuth } from "@deanrtaylor/myfin-common";
import { User } from '../models/user-model';

const router = express.Router();

router.post(
  "/api/finances/user",
  requireAuth,
  async (req: Request, res: Response) => {
    //   'update user profile here'
    //
    const { email, username, monthlySalary, currency, phone } = req.body;

    const response = await User.updateExistingUser({ 
      email, 
      username, 
      monthlySalary, 
      currency, 
      phone });

    res.send({
      email: response.email,
      monthlySalary: response.monthlySalary,
      currency: response.currency,
      phone: response.phone
    });
  }
);

export { router as updateUserRouter };
