import { Response, Request } from 'express';
import * as ConfirmationService from '../services/confirmation.service'

const verifyEmail = async (req: Request, res: Response) => {
    
    const verifyResult = await ConfirmationService.verifyEmail(req.params.hash);

    return res.status(verifyResult.returnCode!).json({
        success: verifyResult.success,
        message: verifyResult.errorMessage,
        object: verifyResult.resultObject
    });
};

export default { verifyEmail };