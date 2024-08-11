import { ObjectId } from 'mongoose';
export interface UserInterface {
    _id: ObjectId;
    username: string;
    email: string;
    phone: string;
    address: string;
    age: string;
    gender: string;
    role: {
        _id: ObjectId;
        name: string;
    };
    permissions: [];
}
