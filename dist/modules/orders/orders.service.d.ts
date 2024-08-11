import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserInterface } from '../users/users.interface';
export declare class OrdersService {
    private OrderModel;
    constructor(OrderModel: SoftDeleteModel<OrderDocument>);
    create(createOrderDto: CreateOrderDto, user: UserInterface): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createMany(user: UserInterface, orderList: any): Promise<boolean>;
    findAll(qs: string, currentPage: number, limit: number): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
    }>;
    findOne(_id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string, user: UserInterface): Promise<string>;
    update(_id: string, updateOrderDto: UpdateOrderDto, user: UserInterface): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
