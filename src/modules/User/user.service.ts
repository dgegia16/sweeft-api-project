import jwt from 'jsonwebtoken';
import { hashPassword } from '@src/utils/manageAuth';
import { CreateUserDto } from './dto/createUser.dto';
import { TInviteTokenPayload } from '@src/utils/manageInvite';

import { Users } from './user.entity';

export async function CreateUser(body: CreateUserDto) {
  const { registerToken } = body;
  const secret = process.env['INVITATION_TOKEN_SECRET'] as string;

  return new Promise((resolve, reject) => {
    jwt.verify(
      registerToken,
      secret,
      async (err: any, decoded: TInviteTokenPayload) => {
        if (err) {
          return reject('Invalid Register token');
        }

        const { email, companyId } = decoded;
        const hashedPassword = await hashPassword(body.password);
        const user = Users.create({
          email,
          companyId,
          password: hashedPassword
        });
        await user.save();
        return resolve(user);
      }
    );
  });
}

export async function GetUserById(userId: string) {
  const user = await Users.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
