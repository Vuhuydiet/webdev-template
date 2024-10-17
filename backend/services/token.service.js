import jwt from 'jsonwebtoken';


class TokenService {
  static generateToken(userId, expiresInDays = 1) {
    const expiresInSeconds = expiresInDays * 24 * 60 * 60; // 1 day in seconds

    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
    };
    
    return jwt.sign(payload, process.env.JWT_PRIVTE_KEY, { algorithm: 'RS256' });
  }

  static verifyToken(token) {
    jwt.verify(token, process.env.JWT_PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
      if (err) {
        return null;
      }
      return payload;
    });
  }
}

export default TokenService;