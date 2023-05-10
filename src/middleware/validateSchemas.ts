import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import { IUser } from '../models/User';
import Logging from '../library/Logging';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
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
            firstname: Joi.string().max(32), //.required()
            lastname: Joi.string().max(32), //.required()
            email: Joi.string().required().max(32).lowercase().trim(),
            password: Joi.string().required().pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$'))
        })
    }
};
