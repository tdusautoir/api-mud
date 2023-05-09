import { Document } from "mongoose";
import Confirmation from "../models/Confirmation";
import bcrypt from 'bcrypt';
import { transporter } from "../middleware/transporter";
import * as UserService from '../services/user.service'
import uuid from 'uuid'

export const handleMailConfirmation = async (currentUserId: string) => {
    const verifCode = uuid.v4();
    const hashedCode = await bcrypt.hash(verifCode, 10);

    // Envoyer le code par mail
    const user = await UserService.findById(currentUserId);

    const mailData = {
        from: process.env.GMAIL_MAIL,  // sender address
        to: user?.email,   // list of receivers
        subject: 'Email Verification',
        text: 'http://localhost:3000/mail/' + hashedCode
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

const createConfirmation = async (conf: Document) => {
    Confirmation.create(conf);
}