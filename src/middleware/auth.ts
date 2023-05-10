import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import Logging from '../library/Logging';

interface TokenRequest extends Request {
    token: any;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization && process.env.JWT_SECRET) {
            const token = req.headers.authorization.split(' ')[1];
            (req as TokenRequest).token = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } else {
            res.status(401).json({ message: 'Incorrect Auth Token' });
        }
    } catch (error) {
        Logging.error(error);
        res.status(401).json({ message: 'Incorrect Auth Token' });
    }
};
