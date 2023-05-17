import express from "express";
import controller from '../controllers/parameter.controller';

const router = express.Router();

router.get('/:key', controller.getParametersByKey);
router.get('/:key/:value', controller.getSpecificParameter);
router.post('/', controller.createParameter);

export default router;