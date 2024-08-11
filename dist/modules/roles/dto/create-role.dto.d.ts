import mongoose from 'mongoose';
export declare class CreateRoleDto {
    name: string;
    permissions: mongoose.Schema.Types.ObjectId[];
}
