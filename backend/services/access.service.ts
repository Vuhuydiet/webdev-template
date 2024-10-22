import { getHashedPassword, invalidatePassword } from '../utils/cryptoUtils.js';

import prisma from '../prisma/index.js';

class AccessService {
  static async signUp(username: string, password: string) {
    try {
      // check if username already exists
      const user = await prisma.user.findUnique({
        where: { username: username }
      });
      // if it does, return an error object
      if (user) {
        return {
          userId: null,
          message: 'Username already exists',
          code: 400,
        };
      }

      // else, create a new user and return a success object
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: getHashedPassword(password)
        }
      })
      //return successObject;
      return {
        userId: newUser.id,
        message: 'User created successfully',
        code: 201,
      };      
    } 
    catch (err: any) {
      return {
        message: err.message,
        code: 500,
      };
    }
  }

  static async signIn(username: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username }
      });
      if (!user) {
        return {
          userId: null,
          message: 'User not found',
          code: 404,
        };
      }

      if (!invalidatePassword(password, user.password)) {
        return {
          userId: null,
          message: 'Incorrect password',
          code: 400,
        };
      }

      return {
        userId: user.id,
        message: 'User signed in successfully',
        code: 200,
      };
    } 
    catch (err: any) {
      return {
        message: err.message,
        code: 500,
      };
    }
  }
}


export default AccessService;