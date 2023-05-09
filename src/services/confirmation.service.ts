import { Document } from "mongoose";
import Confirmation, { IConfirmationModel } from "../models/Confirmation";
import bcrypt, { compareSync } from 'bcrypt';
import { transporter } from "../middleware/transporter";
import * as UserService from '../services/user.service'
import * as uuid from 'uuid'
import { string } from "joi";

export const handleMailConfirmation = async (currentUserId: string) => {
    const verifCode = uuid.v4();
    const hashedCode = await bcrypt.hash(verifCode, 10);

    // Envoyer le code par mail
    const user = await UserService.findById(currentUserId);

    const mailData = {
        from: process.env.GMAIL_MAIL,  // sender address
        to: user?.email,   // list of receivers
        subject: 'Email Verification',
        text: 'Verify your e-mail at http://localhost:3000/mail/verify/' + hashedCode
    }

    transporter.sendMail(mailData, (error, info) => {
        if(error){
            console.log(error);
        }

        console.log(info);
    });

    // Enregistrer le code de vérif en base
    const newConf = new Confirmation({
        userId: currentUserId,
        codeHash: hashedCode
    })

    await createConfirmation(newConf);
}

// TODO : remplacer le type de retour par un ResultDTO
export const verifyEmail = async (hash: string): Promise<boolean> => {
    const conf = await getConfirmationByHash(hash);

    if(conf){
        const same = conf.codeHash === hash

        if(same){
            const user = await UserService.findById(conf.userId);

            if(user){
                user.verified = true;
                await UserService.updateUser(user._id, user);
                deleteConfirmation(conf._id);

                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

const getConfirmationByHash = async (hash: string): Promise<IConfirmationModel | null> => {
    return Confirmation.findOne({codeHash:hash});
}

const deleteConfirmation = async (confId: string): Promise<IConfirmationModel | null> => {
    return Confirmation.findByIdAndDelete(confId);
}

const createConfirmation = async (conf: Document) => {
    Confirmation.create(conf);
}

