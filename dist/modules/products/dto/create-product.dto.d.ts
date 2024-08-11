import mongoose from 'mongoose';
export declare class CreateProductDto {
    name: string;
    price: string;
    description: string;
    quantity: string;
    category: mongoose.Schema.Types.ObjectId;
    images: string[];
    discount: string;
}
