import User from '../models/User';
import { Request, Response } from 'express';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export { getUsers };
