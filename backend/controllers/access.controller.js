import AccessService from "../services/access.service.js";

class AccessController {
  async signUp(req, res, next) {
    try {
      res.status(201).json(await AccessService.signUp(req.body));
    }
    catch (err) {
      console.error(err);
      next(err);
    }
  }
}

export default new AccessController();