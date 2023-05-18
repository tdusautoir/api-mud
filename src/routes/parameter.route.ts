import express from "express";
import controller from '../controllers/parameter.controller';

const router = express.Router();

router.get('/key/:key', controller.getParametersByKey);
router.get('/specific/:key/:value', controller.getSpecificParameter);
router.get('/:paramId', controller.getParameterById);
router.post('/', controller.createParameter);

export default router;