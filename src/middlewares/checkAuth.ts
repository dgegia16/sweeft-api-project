import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { TJWTPayload } from '@src/utils/manageAuth';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const secret = process.env['ACCESS_TOKEN_SECRET'] as string;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secret, (err: any, decoded: TJWTPayload) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }

    const auth = {
      id: decoded.id,
      type: decoded.type
    };

    req.auth = auth;
    res.auth = auth;

    next();
  });
}

export function checkCompanyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req?.auth?.type !== 'company') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

export function checkUserAuth(req: Request, res: Response, next: NextFunction) {
  if (req?.auth?.type !== 'user') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}
