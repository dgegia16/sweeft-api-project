import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ParentEntity } from '@src/shared/parentEntity';
import { ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../Company/company.entity';
import { Files } from '../Files/files.entity';

@Entity()
export class Users extends ParentEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Company, (company) => company.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: string;

  @OneToMany(() => Files, (file) => file.ownerUser, { onDelete: 'CASCADE' })
  files: Files[];

  @ManyToMany(() => Files)
  @JoinTable()
  sharedFiles: Files[];
}
