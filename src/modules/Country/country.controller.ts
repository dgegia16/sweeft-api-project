import { Request, Response } from 'express';
import {
  CreateCountry,
  GetCountries,
  DeleteCountry,
  GetOneCountry
} from './country.service';

class CountryController {
  async createCountry(req: Request, res: Response) {
    try {
      const country = await CreateCountry(req.body);
      return res.status(201).json(country);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getCountries(_: Request, res: Response) {
    try {
      console.log(res.auth);
      const countries = await GetCountries();
      return res.status(200).json(countries);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteCountry(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedCountry = await DeleteCountry(id);
      return res.status(202).json(deletedCountry);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getOneCountry(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const country = await GetOneCountry(id);
      return res.status(200).json(country);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new CountryController();
