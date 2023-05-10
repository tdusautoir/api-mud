import Confirmation, { IConfirmationModel } from '../models/Confirmation';
import bcrypt from 'bcrypt';
import { transporter } from '../library/transporter';
import * as UserService from '../services/user.service';
import * as uuid from 'uuid';
import { VerifyEmailResult } from '../models/results/confirmationResults';
import Logging from '../library/Logging';

export const handleMailConfirmation = async (currentUserId: string) => {
    const verifCode = uuid.v4();
    const hashedCode = await bcrypt.hash(verifCode, 10);

    // Envoyer le code par mail
    const user = await UserService.findById(currentUserId);

    const mailData = {
        from: process.env.GMAIL_MAIL, // sender address
        to: user?.email, // list of receivers
        subject: 'Email Verification',
        text: `Verify your e-mail at ${process.env.CURRENT_URL}/login/` + hashedCode
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            Logging.error(error);
        }

        if (info) {
            Logging.info(info);
        }
    });

    // Enregistrer le code de vérif en base
    const newConf = new Confirmation({
        userId: currentUserId,
        codeHash: hashedCode
    });

    await createConfirmation(newConf);
};

// TODO : remplacer le type de retour par un ResultDTO
export const verifyEmail = async (hash: string): Promise<VerifyEmailResult> => {
    const conf = await getConfirmationByHash(hash);

    if (!conf) {
        return new VerifyEmailResult(false, `Could not find confirmation entry with hash ${hash}`, 404);
    }

    const same = conf.codeHash === hash;

    if (!same) {
        return new VerifyEmailResult(false, `Confirmation hash does not match link hash`, 400);
    }

    const user = await UserService.findById(conf.userId);

    if (!user) {
        return new VerifyEmailResult(false, `User linked to the confirmation hash could not be found (id: ${conf.userId}`, 404);
    }

    user.verified = true;
    await UserService.updateUser(user._id, user);
    deleteConfirmation(conf._id);

    return new VerifyEmailResult(true, undefined, undefined, user);
}

const getConfirmationByHash = async (hash: string): Promise<IConfirmationModel | null> => {
    return Confirmation.findOne({ codeHash: hash });
};

const deleteConfirmation = async (confId: string): Promise<IConfirmationModel | null> => {
    return Confirmation.findByIdAndDelete(confId);
};

const createConfirmation = async (conf: IConfirmationModel) => {
    Confirmation.create(conf);
};
