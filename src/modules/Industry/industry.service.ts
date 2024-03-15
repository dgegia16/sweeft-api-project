import { Industry } from './industry.entity';
import { CreateIndustryDto } from './dtos/createIndustry.dto';

export async function createIndustry(body: CreateIndustryDto) {
  const industry = Industry.create({ ...body });
  return await industry.save();
}

export async function getIndustries() {
  return await Industry.find();
}

export async function getOneIndustry(id: string) {
  const industry = await Industry.findOne({ where: { id } });

  if (!industry) {
    throw new Error('Industry not found');
  }
  return industry;
}

export async function deleteIndustry(id: string) {
  const industry = await getOneIndustry(id);
  await industry.remove();
  return industry;
}
