import mongoose from 'mongoose';
export declare class CreateOrderDto {
    username: string;
    phone: string;
    email: string;
    address: string;
    productId: mongoose.Schema.Types.ObjectId;
    description: string;
    quanlity: string;
    status: string;
}
