import { Request, Response } from 'express';
import { CreateUser } from './user.service';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await CreateUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: JSON.stringify(error) });
    }
  }
}

export default new UserController();
