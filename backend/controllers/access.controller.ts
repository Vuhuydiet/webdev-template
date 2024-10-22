import { Request, Response, NextFunction } from "express";
import AccessService from "../services/access.service.js";

export default {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const result = await AccessService.signUp(username, password);
      res.status(result.code).json({ message: result.message });
    }
    catch (err) {
      console.error(err);
      next(err);
    }
  }
}
