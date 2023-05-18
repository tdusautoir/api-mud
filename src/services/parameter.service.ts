import { MudStatusCode } from "../helpers/constants";
import Parameter, { IParameterModel } from "../models/Parameter";
import { CreateParamResult } from "../models/results/parameter.results";

export const getParametersByKey = async (key: string): Promise<IParameterModel[]> => {
    return await Parameter.find({ cle: { $regex: new RegExp(key, 'i') }});
}

export const getSpecificParameter = async (key: string, value: string): Promise<IParameterModel | null> => {
    return await Parameter.findOne({ cle: { $regex: new RegExp(key, 'i') }, valeur: { $regex: new RegExp(value, 'i') }});
}

export const getParameterById = async (paramId: string): Promise<IParameterModel | null> => {
    return await Parameter.findById(paramId);
}

export const createParameter = async (key: string, value: string): Promise<CreateParamResult> => {
    // vérif existant
    const existingParam = await getSpecificParameter(key, value);

    if(existingParam) {
        return new CreateParamResult(false, `Parameter with key ${key} and value ${value} already exists`, MudStatusCode.BAD_REQUEST);
    }

    // Création
    const newParam = new Parameter({
        cle: key.toUpperCase(),
        valeur: value.toUpperCase()
    });

    await Parameter.create(newParam);

    // Vérif création
    const createdParam = await getSpecificParameter(newParam.cle, newParam.valeur);

    if(!createdParam) {
        return new CreateParamResult(false, `Could not find newly created parameter`, MudStatusCode.NOT_FOUND);
    }

    return new CreateParamResult(true, undefined, MudStatusCode.CREATED, createdParam);
}