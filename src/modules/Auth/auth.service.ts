import { Company } from '../Company/company.entity';
import { Users } from '../User/user.entity';

import { comparePassword } from '@src/utils/manageAuth';
import { generateJWT } from '@src/utils/manageAuth';

export async function Login(email: string, password: string) {
  const companyToken = await CheckCompanyLogin(email, password);
  if (companyToken) return companyToken;

  const userToken = await CheckUserLogin(email, password);
  if (userToken) return userToken;

  if (!userToken && !companyToken) {
    throw new Error('Invalid email or password');
  }
}

async function CheckUserLogin(email: string, password: string) {
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return false;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateJWT({
    id: user.id,
    type: 'user'
  });

  return token;
}

async function CheckCompanyLogin(email: string, password: string) {
  const company = await Company.findOne({ where: { email } });

  if (!company) {
    return false;
  }

  const isMatch = await comparePassword(password, company.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  if (!company.verified) {
    throw new Error('Company not verified');
  }

  const token = generateJWT({
    id: company.id,
    type: 'company'
  });

  return token;
}
