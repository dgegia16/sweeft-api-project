import express from 'express';
import AuthController from './auth.controller';
import { ValidateBody } from '@src/utils/validateBody';
import { LoginDto } from './dto/Login.dto';

export const AuthRouter = express.Router();

AuthRouter.post('/login', ValidateBody(LoginDto), AuthController.login);
