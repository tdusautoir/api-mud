import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    Logging.info(`${req.method} ${req.url}`);
    next();
};
