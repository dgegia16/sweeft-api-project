import { IsString, IsUUID } from 'class-validator';

export class UploadFileDto {
  @IsString()
  name: string;

  @IsUUID()
  ownerUserId: string;

  @IsUUID()
  ownerCompanyId: string;
}
