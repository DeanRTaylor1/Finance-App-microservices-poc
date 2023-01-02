import request from "supertest";
import { app } from "../../app";

it('can fetch users if signed in', async () => {
    await request(app).get("/api/finances").expect(201)
    
})
