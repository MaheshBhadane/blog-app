/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-console */
import jwt, { Secret, SignOptions } from "jsonwebtoken";

interface JwtPayload {
  [key: string]: any;
}

// signing jwt
export function signJwtToken(
  payload: JwtPayload,
  options: SignOptions = {}
): string {
  const secret: Secret = process.env.JWT_SECRET as Secret;
  const token: string = jwt.sign(payload, secret, options);
  return token;
}

// verifying jwt
export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    const secret: Secret = process.env.JWT_SECRET as Secret;
    const payload: JwtPayload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default { signJwtToken, verifyJwtToken };
