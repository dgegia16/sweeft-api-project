import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import { Database } from '@src/shared/database';
import { errorHandler } from '@src/middlewares/errorHandler';

// routers
import { CompanyRouter } from '@src/modules/Company/company.router';
import { CountryRouter } from '@src/modules/Country/country.router';
import { IndustryRouter } from '@src/modules/Industry/industry.router';
import { UserRouter } from '@src/modules/User/user.router';
import { AuthRouter } from '@src/modules/Auth/auth.router';
import { FilesRouter } from '@src/modules/Files/files.router';

dotenv.config();
const PORT: number = parseInt(process.env['PORT'] as string, 10);

if (!process.env['PORT']) {
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/api/auth', AuthRouter);
app.use('/api/company', CompanyRouter);
app.use('/api/country', CountryRouter);
app.use('/api/industry', IndustryRouter);
app.use('/api/user', UserRouter);
app.use('/api/files', FilesRouter);

async function main() {
  await Database.initialize();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();
