import { ParentEntity } from '@src/shared/parentEntity';
import { Column, Entity, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { Users } from '@src/modules/User/user.entity';
import { Company } from '@src/modules/Company/company.entity';

@Entity()
export class Files extends ParentEntity {
  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ default: false })
  private: boolean;

  @ManyToOne(() => Users, (user) => user.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerUserId' })
  ownerUser: Users;

  @Column()
  ownerUserId: string;

  @ManyToOne(() => Company, (company) => company.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerCompanyId' })
  ownerCompany: Company;

  @Column()
  ownerCompanyId: string;
}
