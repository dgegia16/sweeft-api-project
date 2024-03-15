import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Entities
import { Country } from '@src/modules/Country/country.entity';
import { Industry } from '@src/modules/Industry/industry.entity';
import { Company } from '@src/modules/Company/company.entity';
import { Users } from '@src/modules/User/user.entity';
import { Files } from '@src/modules/Files/files.entity';

export const Database = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'root',
  password: 'root',
  database: 'sweeft',
  synchronize: true,
  logging: false,
  entities: [Country, Industry, Company, Users, Files],
  migrations: [],
  subscribers: []
});
