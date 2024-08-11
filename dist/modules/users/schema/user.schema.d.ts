import mongoose, { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    username: string;
    email: string;
    password: string;
    phone: string;
    age: string;
    role: mongoose.Schema.Types.ObjectId;
    address: string;
    gender: string;
    refreshToken: string;
    createdAt: Date;
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        username: string;
    };
    updateAt: Date;
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        username: string;
    };
    deletedAt: Date;
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        username: string;
    };
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}>;
