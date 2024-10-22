import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import getPath from '../utils/getPath.js';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Algorithm } from 'jsonwebtoken';

import prisma from '../prisma/index.js';

const PUB_KEY = fs.readFileSync(
  getPath('configs/public_key.pem'),
  'utf8',
);


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'] as Algorithm[],
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const userId = jwt_payload.sub;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) 
        return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

export default passport.authenticate('jwt', { session: false })
