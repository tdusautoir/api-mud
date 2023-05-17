import mongoose, { Schema, Document } from 'mongoose';

/**Gère tous les choix possibles proposés dans le site (persos, maps, rangs...) */
export interface IParameter {
    cle: string;
    valeur: string;
}

export interface IParameterModel extends Document, IParameter {}

const ParameterSchema: Schema = new Schema({
    cle: {
        type: String,
        required: true        
    },
    valeur: {
        type: String,
        required: true
    }
});

export const ParameterModel = mongoose.model<IParameterModel>('Parameter', ParameterSchema);

export default ParameterModel;