import { Request, Response } from 'express';
import {
  CreateCompany,
  ActivateCompany,
  SendActivationEmail,
  ChooseSubscriptionPlan,
  GetCompanyById,
  InviteCompanyUser,
  DeleteCompanyUser
} from './company.service';

class CompanyController {
  async createCompany(req: Request, res: Response) {
    try {
      const result = await CreateCompany(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async chooseSubscriptionPlan(req: Request, res: Response) {
    try {
      const { subscriptionPlan } = req.body;
      await ChooseSubscriptionPlan(req.auth?.id as string, subscriptionPlan);
      res
        .status(200)
        .json({ message: 'Subscription plan chosen successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async sendActivationLink(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      await SendActivationEmail(companyId);
      res.status(200).json({ message: 'Activation link sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async activateCompany(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      await ActivateCompany(companyId);
      res.status(201).send('<h1>Activation successful!</h1>');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getActiveCompany(req: Request, res: Response) {
    try {
      const company = await GetCompanyById(req.auth?.id as string);
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async inviteCompanyUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await InviteCompanyUser(req.auth?.id as string, email);
      res.status(200).json({ message: 'Invitation sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteCompanyUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const deletedUser = await DeleteCompanyUser(userId);
      res.status(202).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CompanyController();
