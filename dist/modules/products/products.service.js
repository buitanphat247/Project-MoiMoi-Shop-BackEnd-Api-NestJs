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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_schema_1 = require("./schema/product.schema");
const mongoose_1 = require("@nestjs/mongoose");
const api_query_params_1 = __importDefault(require("api-query-params"));
let ProductsService = class ProductsService {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }
    async findAll(qs, currentPage, limit) {
        const { filter, sort, projection, population } = (0, api_query_params_1.default)(qs);
        delete filter['current'];
        const totalItems = await this.ProductModel.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (currentPage - 1) * limit;
        return {
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems,
            },
            result: await this.ProductModel.find(filter)
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .populate(population)
                .exec(),
        };
    }
    async findOne(_id) {
        return await this.ProductModel.findOne({ _id }).populate({
            path: 'category',
            select: {
                name: 1,
            },
        });
    }
    async create(user, productDto) {
        const { category, description, discount, images, name, price, quantity } = productDto;
        return await this.ProductModel.create({
            category,
            description,
            discount,
            images,
            name,
            price,
            quantity,
            createdBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async createMany(user, productList) {
        for (let item of productList) {
            await this.create(user, item);
        }
        return true;
    }
    async delete(_id, user) {
        const filter = { _id };
        await this.ProductModel.softDelete(filter);
        await this.ProductModel.findOneAndUpdate(filter, {
            deletedBy: {
                _id: user._id,
                name: user.username,
            },
        });
        return 'Delete success';
    }
    async updateImage(_id, user, productDto) {
        const { images } = productDto;
        return await this.ProductModel.findOneAndUpdate({ _id }, {
            images,
            updatedBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async findByName(name) {
        return await this.ProductModel.find().where('images.name').equals(name);
    }
    async update(user, productDto, _id) {
        const { category, description, discount, images, name, price, quantity } = productDto;
        return await this.ProductModel.findOneAndUpdate({ _id }, {
            category,
            description,
            discount,
            images,
            name,
            price,
            quantity,
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map