import express from 'express';
import CountryController from './country.controller';

import { ValidateBody } from '@src/utils/validateBody';
import { CreateCountryDto } from './dtos/createCountry.dto';
import { checkAuth } from '@src/middlewares/checkAuth';

export const CountryRouter = express.Router();

CountryRouter.get('/', checkAuth, CountryController.getCountries);

CountryRouter.post(
  '/',
  ValidateBody(CreateCountryDto),
  CountryController.createCountry
);

CountryRouter.delete('/:id', CountryController.deleteCountry);

CountryRouter.get('/:id', CountryController.getOneCountry);
