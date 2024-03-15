import jwt from 'jsonwebtoken';

export type TInviteTokenPayload = {
  companyId: string;
  email: string;
};

export function generateInviteToken({ companyId, email }: TInviteTokenPayload) {
  const invitationToken = jwt.sign(
    { companyId, email },
    process.env['INVITATION_TOKEN_SECRET'] as string,
    { expiresIn: '1d' }
  );
  return invitationToken;
}
