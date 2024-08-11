import mongoose, { HydratedDocument } from 'mongoose';
export type CategoryDocument = HydratedDocument<Category>;
export declare class Category {
    name: string;
    path: string;
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
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, mongoose.Document<unknown, any, Category> & Category & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Category, mongoose.Document<unknown, {}, mongoose.FlatRecord<Category>> & mongoose.FlatRecord<Category> & {
    _id: mongoose.Types.ObjectId;
}>;
