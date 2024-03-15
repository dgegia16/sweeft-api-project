import express from 'express';
import { ValidateBody } from '@src/utils/validateBody';
import IndustryController from './industry.controller';
import { CreateIndustryDto } from './dtos/createIndustry.dto';

export const IndustryRouter = express.Router();

IndustryRouter.post(
  '/',
  ValidateBody(CreateIndustryDto),
  IndustryController.createIndustry
);

IndustryRouter.get('/', IndustryController.getIndustries);

IndustryRouter.get('/:id', IndustryController.getOneIndustry);

IndustryRouter.delete('/:id', IndustryController.deleteIndustry);
