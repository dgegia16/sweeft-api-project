import { Company } from './company.entity';
import { hashPassword } from '@src/utils/manageAuth';
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { sendEmail } from '@src/utils/sendEmail';
import { TSubscriptionPlan_Enum } from './company.entity';
import { generateInviteToken } from '@src/utils/manageInvite';
import { Users } from '../User/user.entity';
import { GetUserById } from '../User/user.service';

export async function CreateCompany(body: CreateCompanyDto): Promise<Company> {
  const hashedPassword = await hashPassword(body.password);
  const company = Company.create({ ...body, password: hashedPassword });
  await company.save();
  await SendActivationEmail(company.id);
  return company;
}

export async function ActivateCompany(companyId: string): Promise<Company> {
  const company = await GetCompanyById(companyId);

  company.verified = true;
  await company.save();
  return company;
}

export async function GetCompanyById(companyId: string): Promise<Company> {
  const company = await Company.findOne({ where: { id: companyId } });
  if (!company) {
    throw new Error('Company not found');
  }
  return company;
}

export async function ChooseSubscriptionPlan(
  companyId: string,
  subscriptionPlan: TSubscriptionPlan_Enum
): Promise<Company> {
  const company = await GetCompanyById(companyId);
  company.subscriptionPlan = subscriptionPlan;
  await company.save();
  return company;
}

export async function SendActivationEmail(companyId: string): Promise<void> {
  const company = await GetCompanyById(companyId);

  if (company.verified) {
    throw new Error('Company already verified');
  }

  const activationLink = `${process.env['API_BASE_URL']}/api/company/activate/${companyId}`;
  const message = `Dear ${company.name},\n\nPlease click on the following link to activate your account:\n${activationLink}`;

  await sendEmail({
    to: company.email,
    from: process.env['MAIL_USER'] as string,
    subject: 'Activate your account',
    text: message
  });
}

export async function InviteCompanyUser(companyId: string, email: string) {
  const company = await GetCompanyById(companyId);

  const user = await Users.find({ where: { email } });
  if (user.length > 1) {
    throw new Error('User already exists');
  }
  const invitationToken = generateInviteToken({ companyId, email });

  await sendEmail({
    to: email,
    from: process.env['MAIL_USER'] as string,
    subject: `Invitation to join company ${company.name}`,
    text: `Dear user,\n\nYou have been invited to join ${company.name}.\n This is your invitation token ${invitationToken}`
  });
}

export async function DeleteCompanyUser(userId: string) {
  const user = await GetUserById(userId);
  await user.remove();
  return user;
}
