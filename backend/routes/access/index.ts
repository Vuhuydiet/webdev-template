import express from 'express';
const router = express.Router();

import accessController from '../../controllers/access.controller.js';

router.post('/signup', accessController.signUp);


export default router;
