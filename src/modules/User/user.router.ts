import express from 'express';
import UserController from './user.controller';
import { ValidateBody } from '@src/utils/validateBody';
import { CreateUserDto } from './dto/createUser.dto';

export const UserRouter = express.Router();

UserRouter.post('/', ValidateBody(CreateUserDto), UserController.createUser);
