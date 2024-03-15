import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export type TJWTPayload = {
  id: string;
  type: 'user' | 'company';
};

export function generateJWT(payload: TJWTPayload): string {
  const token = jwt.sign(
    payload,
    process.env['ACCESS_TOKEN_SECRET'] as string,
    {
      expiresIn: '1d'
    }
  );

  return token;
}
