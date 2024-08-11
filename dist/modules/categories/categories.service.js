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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_schema_1 = require("./schema/category.schema");
const mongoose_2 = __importDefault(require("mongoose"));
const api_query_params_1 = __importDefault(require("api-query-params"));
let CategoriesService = class CategoriesService {
    constructor(CategoryModel) {
        this.CategoryModel = CategoryModel;
    }
    async findAll(qs, currentPage, limit) {
        const { filter, sort, projection, population } = (0, api_query_params_1.default)(qs);
        delete filter['current'];
        const totalItems = await this.CategoryModel.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (currentPage - 1) * limit;
        return {
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems,
            },
            result: await this.CategoryModel.find(filter)
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .populate(population)
                .exec(),
        };
    }
    async findOne(_id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException(`Không tìm thấy dữ liệu category có id ${_id}`);
        }
        return await this.CategoryModel.findOne({ _id });
    }
    async create(categoryDto, user) {
        const isExist = (await this.CategoryModel.findOne({
            path: categoryDto.path,
        }))?.path !== categoryDto.path
            ? true
            : false;
        if (!isExist) {
            throw new common_1.BadRequestException('Category đã tồn tại vui lòng tạo mới!');
        }
        return await this.CategoryModel.create({
            ...categoryDto,
            createdBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async update(categoryDto, user, _id) {
        const filter = { _id };
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException(`Không tìm thấy dữ liệu category có id ${_id}`);
        }
        return await this.CategoryModel.findOneAndUpdate(filter, {
            ...categoryDto,
            updatedBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async delete(_id, user) {
        const filter = { _id };
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException(`Không tìm thấy dữ liệu category có id ${_id}`);
        }
        await this.CategoryModel.softDelete(filter);
        await this.CategoryModel.findOneAndUpdate(filter, {
            deletedBy: {
                _id: user._id,
                name: user.username,
            },
        });
        return 'Delete success';
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [Object])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map