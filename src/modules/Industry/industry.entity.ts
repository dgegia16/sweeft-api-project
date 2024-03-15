import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';
import { ParentEntity } from '@src/shared/parentEntity';

@Entity()
export class Industry extends ParentEntity {
  @Column()
  @IsString()
  name: string;
}
