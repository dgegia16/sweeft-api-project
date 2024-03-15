import { Request, Response } from 'express';
import { CreateUser, UpdateUserDetails } from './user.service';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await CreateUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: JSON.stringify(error) });
    }
  }

  async updateUserDetails(req: Request, res: Response) {
    try {
      const userId = req.params.userId; 
      const updatedDetails = req.body; 

      const updatedUser = await UpdateUserDetails(userId, updatedDetails);

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
