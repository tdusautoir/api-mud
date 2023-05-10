import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import { IUserModel } from '../models/User';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    user: {
        signin: Joi.object<IUser>({
            username: Joi.string().required().max(32),
            password: Joi.string().required().pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$'))
        }),
        signup: Joi.object<IUser>({
            username: Joi.string().required().max(32),
            // firstname: Joi.string().required().max(32),
            // lastname: Joi.string().required().max(32),
            email: Joi.string().required().max(32).lowercase().trim(),
            password: Joi.string().required().pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$'))
        })
    }
};
