import { JwtPayload } from 'jsonwebtoken';

export interface JWTPayloadType extends JwtPayload {
  id: string;
  login: string;
  role: string;
}
