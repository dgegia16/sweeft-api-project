import { Request, Response } from 'express';
import {
  createIndustry,
  getIndustries,
  deleteIndustry,
  getOneIndustry
} from './industry.service';

class IndustryController {
  async createIndustry(req: Request, res: Response) {
    try {
      const industry = await createIndustry(req.body);
      return res.status(201).json(industry);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getIndustries(_: Request, res: Response) {
    try {
      const industries = await getIndustries();
      return res.status(200).json(industries);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getOneIndustry(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const industry = await getOneIndustry(id);
      return res.status(200).json(industry);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteIndustry(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedIndustry = await deleteIndustry(id);
      return res.status(202).json(deletedIndustry);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new IndustryController();
