import mongoose, { Schema, InferSchemaType } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            maxlength: 32
        },
        lastname: {
            type: String,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            match: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/
        }
    },
    { timestamps: true }
);

type User = InferSchemaType<typeof UserSchema>;

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
