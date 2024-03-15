import { IsString, IsJWT } from 'class-validator';

export class CreateUserDto {
  @IsString()
  password: string;

  @IsJWT()
  registerToken: string;
}
