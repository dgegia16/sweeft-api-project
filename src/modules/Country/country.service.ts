import { Country } from './country.entity';
import { CreateCountryDto } from './dtos/createCountry.dto';

export async function CreateCountry(body: CreateCountryDto) {
  const country = Country.create({ ...body });
  return await country.save();
}

export async function GetCountries() {
  return await Country.find();
}

export async function DeleteCountry(id: string) {
  const country = await GetOneCountry(id);

  await country.remove();
  return country;
}

export async function GetOneCountry(id: string) {
  const country = await Country.findOne({ where: { id } });
  if (!country) {
    throw new Error('Country not found');
  }
  return country;
}
