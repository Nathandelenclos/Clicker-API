import { Schema, model } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    score: number;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    score: {type: Number, required: true}
});

const User = model<IUser>('User', userSchema);

export default User;