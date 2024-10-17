import express from 'express';
const router = express.Router();

import accessController from '../../controllers/access.controller';

router.post('/signup', accessController.signUp);


export default router;
