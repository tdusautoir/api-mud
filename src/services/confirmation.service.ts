import Confirmation, { IConfirmationModel } from '../models/Confirmation';
import { transporter } from '../library/transporter';
import * as UserService from '../services/user.service';
import * as UserStatsService from '../services/userStats.service';
import * as uuid from 'uuid';
import Logging from '../library/Logging';
import { MudStatusCode } from '../helpers/constants';
import User from '../models/User';
import { CreateConfirmationResult, DeleteConfirmationResult, VerifyEmailResult } from '../models/results/confirmation.results';

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

export const verifyEmail = async (code: string): Promise<VerifyEmailResult> => {
    const conf = await getConfirmationByCode(code);

    if (!conf) {
        return new VerifyEmailResult(false, `Could not find confirmation entry with hash ${code}`, MudStatusCode.NOT_FOUND);
    }

    const same = conf.code === code;

    if (!same) {
        return new VerifyEmailResult(false, `Confirmation hash does not match link hash`, MudStatusCode.BAD_REQUEST);
    }

    const user = await UserService.findById(conf.userId);

    if (!user) {
        return new VerifyEmailResult(false, `User linked to the confirmation hash could not be found (id: ${conf.userId}`, MudStatusCode.NOT_FOUND);
    }

    const newUser = user;
    newUser.verified = true;

    const updatedResult = await UserService.updateUser(conf.userId, newUser);

    if(!updatedResult.success) {
        return new VerifyEmailResult(false, updatedResult.errorMessage, updatedResult.returnCode)
    }

    const deleteConfResult = await deleteConfirmation(conf._id);

    if(!deleteConfResult.success) {
        return new VerifyEmailResult(false, deleteConfResult.errorMessage, deleteConfResult.returnCode)
    }

    // Création des stats
    const createStatResult = await UserStatsService.createUserStats(conf.userId);

    if (!createStatResult.success) {
        return new VerifyEmailResult(false, createStatResult.errorMessage, createStatResult.returnCode, createStatResult.resultObject);
    }

    return new VerifyEmailResult(true, undefined, MudStatusCode.OK, user);
};

const getConfirmationByCode = async (code: string): Promise<IConfirmationModel | null> => {
    return await Confirmation.findOne({ code: code });
};

const getConfirmationById = async (id: string): Promise<IConfirmationModel | null> => {
    return await Confirmation.findById(id);
}

const deleteConfirmation = async (confId: string): Promise<DeleteConfirmationResult> => {

    const conf = await getConfirmationById(confId);

    if (!conf) {
        return new DeleteConfirmationResult(false, `Could not find confirmation with id ${confId}`, MudStatusCode.NOT_FOUND);
    }

    await Confirmation.findByIdAndDelete(confId);

    const deletedConf = await getConfirmationById(confId);

    if (deletedConf) {
        return new DeleteConfirmationResult(false, `Confirmation ${confId} still exists`, MudStatusCode.BAD_REQUEST);
    }

    return new DeleteConfirmationResult(true, undefined, MudStatusCode.OK);
};

const createConfirmation = async (conf: IConfirmationModel): Promise<CreateConfirmationResult> => {
    await Confirmation.create(conf);

    const createdConf = await getConfirmationByCode(conf.code);

    if (createdConf) {
        return new CreateConfirmationResult(true, undefined, MudStatusCode.CREATED, createdConf);
    } else {
        return new CreateConfirmationResult(false, `Error creating mail confirmation for user ${conf.userId}`, MudStatusCode.BAD_REQUEST, conf);
    }
};
