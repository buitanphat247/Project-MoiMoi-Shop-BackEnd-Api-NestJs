import mongoose, { HydratedDocument } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;
export declare class Order {
    username: string;
    phone: string;
    email: string;
    description: string;
    address: string;
    productId: string;
    quanlity: string;
    status: string;
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
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Order & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & mongoose.FlatRecord<Order> & {
    _id: mongoose.Types.ObjectId;
}>;
