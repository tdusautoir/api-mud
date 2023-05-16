import Confirmation, { IConfirmationModel } from '../models/Confirmation';
import { transporter } from '../library/transporter';
import * as UserService from '../services/user.service';
import * as uuid from 'uuid';
import { CreateConfirmationResult, VerifyEmailResult } from '../models/results/confirmationResults';
import Logging from '../library/Logging';
import { MudStatusCode } from '../constants/statusCodes';

export const createUserAndConfirmation = async (currentUserId: string): Promise<CreateConfirmationResult> => {
    const verifCode = uuid.v4();

    // Envoyer le code par mail
    const user = await UserService.findById(currentUserId);

    if (!user) {
        return new CreateConfirmationResult(false, `Could not find user with id ${currentUserId}`, MudStatusCode.NOT_FOUND);
    }

    const mailData = {
        from: process.env.GMAIL_MAIL, // sender address
        to: user?.email, // list of receivers
        subject: 'Email Verification',
        text: `Verify your e-mail at ${process.env.CURRENT_URL}/sign-in/` + verifCode
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            Logging.error(error);
            return new CreateConfirmationResult(false, `Error sending email to ${mailData.to}`, MudStatusCode.BAD_REQUEST, error);
        }

        if (info) {
            Logging.info(info);
        }
    });

    // Enregistrer le code de vérif en base
    const newConf = new Confirmation({
        userId: currentUserId,
        code: verifCode
    });

    return await createConfirmation(newConf);
};

// TODO : remplacer le type de retour par un ResultDTO
export const verifyEmail = async (code: string): Promise<VerifyEmailResult> => {
    const conf = await getConfirmationByCode(code);

    if (!conf) {
        return new VerifyEmailResult(false, `Could not find confirmation entry with hash ${code}`, 404);
    }

    const same = conf.code === code;

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

    return new VerifyEmailResult(true, undefined, MudStatusCode.OK, user);
};

const getConfirmationByCode = async (code: string): Promise<IConfirmationModel | null> => {
    return Confirmation.findOne({ code: code });
};

const deleteConfirmation = async (confId: string): Promise<IConfirmationModel | null> => {
    return Confirmation.findByIdAndDelete(confId);
};

const createConfirmation = async (conf: IConfirmationModel): Promise<CreateConfirmationResult> => {
    Confirmation.create(conf);

    const createdConf = await getConfirmationByCode(conf.code);

    if (createdConf) {
        return new CreateConfirmationResult(true, undefined, MudStatusCode.CREATED, createdConf);
    } else {
        return new CreateConfirmationResult(false, `Error creating mail confirmation for user ${conf.userId}`, MudStatusCode.BAD_REQUEST, conf);
    }
};
