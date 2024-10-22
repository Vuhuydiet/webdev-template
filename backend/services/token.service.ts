import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class TokenService {
  static generateToken(userId: number, expiresInDays = 1) {
    const expiresInSeconds = expiresInDays * 24 * 60 * 60; // 1 day in seconds

    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
    };
    
    if (!process.env.JWT_PRIVATE_KEY) {
      throw new Error('JWT_PRIVATE_KEY is not defined');
    }
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { algorithm: 'RS256' });
  }

  static verifyToken(token: string): any {
    if (!process.env.JWT_PUBLIC_KEY) {
      throw new Error('JWT_PUBLIC_KEY is not defined');
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_PUBLIC_KEY, { algorithms: ['RS256'] });
      return payload;
    } catch (err) {
      return null;
    }
  }
}

export default TokenService;