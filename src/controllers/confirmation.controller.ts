import { Response, Request } from 'express';
import * as ConfirmationService from '../services/confirmation.service'

const verifyEmail = async (req: Request, res: Response) => {
    
    const verifyResult = await ConfirmationService.verifyEmail(req.params.hash);

    if(verifyResult.success)
    {
        return res.status(200).json({message:"Email verified"});
    }
    else{
        return res.status(verifyResult.returnCode!).json({message: verifyResult.errorMessage!})
    }   

};

export default { verifyEmail };