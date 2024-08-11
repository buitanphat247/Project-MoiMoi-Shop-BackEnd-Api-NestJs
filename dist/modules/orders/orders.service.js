"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("./schema/order.schema");
const api_query_params_1 = __importDefault(require("api-query-params"));
let OrdersService = class OrdersService {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async create(createOrderDto, user) {
        const { description, email, phone, address, username, productId, status, quanlity, } = createOrderDto;
        return await this.OrderModel.create({
            description,
            email,
            address,
            status,
            phone,
            productId,
            username,
            quanlity,
            createdBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async createMany(user, orderList) {
        for (let item of orderList) {
            await this.create(item, user);
        }
        return true;
    }
    async findAll(qs, currentPage, limit) {
        const { filter, sort, projection, population } = (0, api_query_params_1.default)(qs);
        delete filter['current'];
        const totalItems = await this.OrderModel.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (currentPage - 1) * limit;
        return {
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems,
            },
            result: await this.OrderModel.find(filter)
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .populate(population)
                .exec(),
        };
    }
    async findOne(_id) {
        return await this.OrderModel.findOne({ _id }).populate({
            path: 'productId',
        });
    }
    async remove(id, user) {
        await this.OrderModel.softDelete({
            _id: id,
        });
        await this.OrderModel.updateOne({ _id: id }, {
            deletedBy: {
                _id: user._id,
                username: user.username,
            },
        });
        return 'Delete success';
    }
    async update(_id, updateOrderDto, user) {
        const { address, description, email, phone, productId, username, quanlity, status, } = updateOrderDto;
        return await this.OrderModel.findOneAndUpdate({ _id }, {
            address,
            description,
            status,
            email,
            phone,
            productId,
            username,
            quanlity,
            updatedBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [Object])
], OrdersService);
//# sourceMappingURL=orders.service.js.map