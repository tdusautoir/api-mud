import { Response, Request } from 'express';
import * as ParamService from '../services/parameter.service'
import { MudStatusCode } from '../helpers/constants';

const getParametersByKey = async (req: Request, res: Response) => {
    const paramKey = req.params.key;
    
    const paramList = await ParamService.getParametersByKey(paramKey);

    if(paramList.length > 0) {
        return res.status(MudStatusCode.OK).json(paramList);
    }
    else {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No parameters found for key ${paramKey}`});
    }
};

const getSpecificParameter = async (req: Request, res: Response) => {
    const paramKey = req.params.key;
    const paramVal = req.params.value;

    const param = await ParamService.getSpecificParameter(paramKey, paramVal);

    if(param) {
        return res.status(MudStatusCode.OK).json(param);
    }
    else {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No parameter found for key ${paramKey} and value ${paramVal}`});
    }
};

const getParameterById = async (req: Request, res: Response) => {
    const paramId = req.params.paramId;

    const param = await ParamService.getParameterById(paramId);

    if(param) {
        return res.status(MudStatusCode.OK).json(param);
    }
    else {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No parameter found for id ${paramId}`});
    }
}

const createParameter = async (req: Request, res: Response) => {
    const paramKey = req.body.key;
    const paramVal = req.body.value;

    const createResult = await ParamService.createParameter(paramKey, paramVal);

    return res.status(createResult.returnCode!).json({
        success: createResult.success,
        message: createResult.errorMessage,
        object: createResult.resultObject
    });
}

export default { 
    getParametersByKey,
    getSpecificParameter,
    createParameter,
    getParameterById
};