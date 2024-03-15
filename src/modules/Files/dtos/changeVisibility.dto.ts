import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ChangeVisibilityDto {
  @IsUUID()
  fileId: string;

  @IsBoolean()
  isPrivate: boolean;
}
