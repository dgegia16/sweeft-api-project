import { IsString, IsUUID } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsUUID()
  industryId: string;

  @IsUUID()
  countryId: string;

  @IsString()
  password: string;
}
