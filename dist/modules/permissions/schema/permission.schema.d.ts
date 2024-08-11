import mongoose, { HydratedDocument } from 'mongoose';
export type PermissionDocument = HydratedDocument<Permission>;
export declare class Permission {
    name: string;
    apiPath: string;
    method: string;
    module: string;
    description: string;
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
export declare const PermissionSchema: mongoose.Schema<Permission, mongoose.Model<Permission, any, any, any, mongoose.Document<unknown, any, Permission> & Permission & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Permission, mongoose.Document<unknown, {}, mongoose.FlatRecord<Permission>> & mongoose.FlatRecord<Permission> & {
    _id: mongoose.Types.ObjectId;
}>;
