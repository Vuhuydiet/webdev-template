import { getHashPassword } from '../utils/cryptoUtils';

class AccessService {
  static async signUp({ username, password }) {
    try {
      // check if username already exists

      // if it does, return an error object

      // else, create a new user and return a success object
      const hashedPassword = getHashedPassword(password);
      //...

      //if new use is created successfully
      
      //return successObject;
    } 
    catch (err) {
      return {
        message: err.message,
        status: 'error',
      };
    }
  }
}


export default AccessService;