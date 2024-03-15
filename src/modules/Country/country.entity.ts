import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';
import { ParentEntity } from '@src/shared/parentEntity';

@Entity()
export class Country extends ParentEntity {
  @Column()
  @IsString()
  name: string;
}
