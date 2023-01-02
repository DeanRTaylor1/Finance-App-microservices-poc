import jwt from 'jsonwebtoken';
import { User } from '../models/user-model';
import Context from './context';
import request from 'supertest';
import mongoose from 'mongoose';

declare global {
    var signin: () => string[];
}

let context: Context;

beforeAll(async () => {
    process.env.JWT_KEY = 'test';
    context = await Context.build();
});

//close postgres connection

// afterAll(async () => {
//   return await context.close();
// });

beforeEach(async () => {
    await context.reset();
});

global.signin = () => {
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = { jwt: token };

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`session=${base64}`];
};
