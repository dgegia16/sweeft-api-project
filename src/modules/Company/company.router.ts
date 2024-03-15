import express from 'express';
import CompanyController from './company.controller';
import { ValidateBody } from '@src/utils/validateBody';

import { CreateCompanyDto } from './dtos/createCompany.dto';
import { ChooseSubscriptionPlanDto } from './dtos/chooseSubsciptionPlan.dto';
import { checkAuth } from '@src/middlewares/checkAuth';
import { checkCompanyAuth } from '@src/middlewares/checkAuth';

export const CompanyRouter = express.Router();

CompanyRouter.post(
  '/',
  ValidateBody(CreateCompanyDto),
  CompanyController.createCompany
);

CompanyRouter.get(
  '/send-activation-link/:companyId',
  CompanyController.sendActivationLink
);

CompanyRouter.get('/activate/:companyId', CompanyController.activateCompany);

CompanyRouter.post(
  '/choose-subscription-plan',
  checkAuth,
  checkCompanyAuth,
  ValidateBody(ChooseSubscriptionPlanDto),
  CompanyController.chooseSubscriptionPlan
);

CompanyRouter.get(
  '/current-company',
  checkAuth,
  checkCompanyAuth,
  CompanyController.getActiveCompany
);

CompanyRouter.post(
  '/invite-user',
  checkAuth,
  checkCompanyAuth,
  CompanyController.inviteCompanyUser
);

CompanyRouter.delete(
  '/delete-user/:userId',
  checkAuth,
  checkCompanyAuth,
  CompanyController.deleteCompanyUser
);
