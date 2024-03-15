import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ParentEntity } from '@src/shared/parentEntity';

import { Country } from '../Country/country.entity';
import { Industry } from '../Industry/industry.entity';
import { Users } from '../User/user.entity';
import { Files } from '../Files/files.entity';

export enum TSubscriptionPlan_Enum {
  FreeTier = 'free-tier',
  Basic = 'basic',
  Premium = 'premium'
}

@Entity()
export class Company extends ParentEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Country, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'countryId' })
  country: Country | null;

  @Column({ nullable: true })
  countryId: string | null;

  @ManyToOne(() => Industry, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'industryId' })
  industry: Industry | null;

  @Column({ nullable: true })
  industryId: string | null;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: TSubscriptionPlan_Enum,
    default: TSubscriptionPlan_Enum.FreeTier,
    nullable: true
  })
  subscriptionPlan: TSubscriptionPlan_Enum | null;

  @OneToMany(() => Users, (user) => user.company, { onDelete: 'CASCADE' })
  users: Users[];

  @OneToMany(() => Files, (file) => file.ownerCompany, { onDelete: 'CASCADE' })
  files: Files[];
}
