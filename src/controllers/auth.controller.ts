import { Response, Request } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logging from '../library/Logging';
import * as UserService from '../services/user.service'
import { MudStatusCode } from '../helpers/constants';

// interface MulterRequest extends Request {
//     file: any;
// }

const JWT_COOKIE_EXPIRES_IN: string = process.env.JWT_COOKIE_EXPIRES_IN || '1';

const signin = async (req: Request, res: Response): Promise<any> => {
    try {
        // Attention à la gestion de la casse, espace etc
        const user = await UserService.findByUsername(req.body.username);
        if (!user) {
            return res.status(MudStatusCode.NOT_FOUND).json({ message: 'User not found' });
        }

        const passwordMatches = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatches) {
            return res.status(MudStatusCode.UNAUTHORIZED).json({ message: 'Bad credentials' });
        }

        // Vérif de la validité de l'adresse mail
        if (!user.verified) {
            return res.status(MudStatusCode.FORBIDDEN).json({ message: 'Email not verified' });
        }

        try {
            const token = jwt.sign(
                {
                    username: user.username,
                    id: user._id
                },
                process.env.JWT_SECRET || '',
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            res.cookie('jwt', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRES_IN) * 60 * 60 * 1000) });

            res.status(MudStatusCode.OK).json({ username: user.username, jwt: token });
        } 
        catch (error) {
            Logging.error(error);
            res.status(MudStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'An error has occured during the token creation.' });
        }
    } 
    catch (error: any) {
        Logging.error(error);
        res.status(MudStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body;
        body.password = await bcrypt.hash(body.password, 10);

        const user = new User({
            ...body
            // profile_pic: (req as MulterRequest).file ? `${req.protocol}://${req.get('host')}/images/${(req as MulterRequest).file.filename}` : null
        });

        const createUserResult = await UserService.createUser(user);

        res.status(createUserResult.returnCode!).json({
            success: createUserResult.success,
            message: createUserResult.errorMessage,
            object: createUserResult.resultObject
        });
    } 
    catch (error: any) {
        Logging.error(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export default { signin, signup };
