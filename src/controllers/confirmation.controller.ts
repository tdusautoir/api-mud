import { Response, Request } from 'express';
import * as ConfirmationService from '../services/confirmation.service'

const verifyEmail = async (req: Request, res: Response) => {
    
    const verified = await ConfirmationService.verifyEmail(req.params.hash);

    if(verified)
    {
        return res.status(200).json({message:"Email verified"});
    }
    else{
        return res.status(404).json({message: "Error verifying email"})
    }   

};

export default { verifyEmail };