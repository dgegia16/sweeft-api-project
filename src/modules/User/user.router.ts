import express from 'express';
import UserController from './user.controller';
import { ValidateBody } from '@src/utils/validateBody';
import { CreateUserDto } from './dto/createUser.dto';
import userController from './user.controller';

export const UserRouter = express.Router();

UserRouter.post('/', ValidateBody(CreateUserDto), UserController.createUser);
UserRouter.put(
  '/update-user-details/:userId',
  ValidateBody(CreateUserDto),
  userController.updateUserDetails
);
