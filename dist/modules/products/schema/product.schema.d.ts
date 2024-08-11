import mongoose, { HydratedDocument } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;
export declare class Product {
    name: string;
    price: number;
    description: string;
    quantity: number;
    category: mongoose.Schema.Types.ObjectId;
    images: string[];
    discount: number;
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
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product> & Product & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, mongoose.FlatRecord<Product>> & mongoose.FlatRecord<Product> & {
    _id: mongoose.Types.ObjectId;
}>;
