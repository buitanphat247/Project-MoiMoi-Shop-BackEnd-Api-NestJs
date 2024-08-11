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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const user_schema_1 = require("./schema/user.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
const api_query_params_1 = __importDefault(require("api-query-params"));
let UsersService = class UsersService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    hash_password(password) {
        var salt = (0, bcryptjs_1.genSaltSync)(10);
        return (0, bcryptjs_1.hashSync)(password, salt);
    }
    check_password(password, password_hashed) {
        return (0, bcryptjs_1.compareSync)(password, password_hashed);
    }
    async findAll(qs, currentPage, limit) {
        const { filter, sort, projection, population } = (0, api_query_params_1.default)(qs);
        delete filter['current'];
        const totalItems = await this.UserModel.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (currentPage - 1) * limit;
        return {
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems,
            },
            result: await this.UserModel.find(filter)
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .populate(population)
                .exec(),
        };
    }
    async findOne(_id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException(`Không tìm thấy dữ liệu role có id ${_id}`);
        }
        return await this.UserModel.findOne({ _id }).populate({
            path: 'role',
            select: {
                name: 1,
                id: 1,
            },
        });
    }
    async register(userDto) {
        const { age, email, password, phone, username, address, gender } = userDto;
        const isExist = (await this.UserModel.findOne({ email })) ? false : true;
        if (!isExist) {
            throw new common_1.BadGatewayException(`Email ${email} đã tồn tại, vui lòng tạo bằng email khác!`);
        }
        return await this.UserModel.create({
            age,
            email,
            password: this.hash_password(password),
            phone,
            address,
            gender,
            role: '66982c969affcd035649a8d7',
            username,
        });
    }
    async createManyUser(userList) {
        for (let item of userList) {
            await this.register(item);
        }
        return true;
    }
    async update(userDto, _id, user) {
        const { age, email, phone, username, address, gender } = userDto;
        const isExist = await this.UserModel.findOne({ email });
        if (isExist !== null && isExist.id !== _id) {
            throw new common_1.BadGatewayException(`Email ${email} đã tồn tại, vui lòng cập nhật bằng email khác!`);
        }
        return await this.UserModel.findOneAndUpdate({ _id }, {
            age,
            email,
            phone,
            gender,
            username,
            address,
            updatedBy: {
                _id: user._id,
                name: user.username,
            },
        });
    }
    async delete(_id, user) {
        const filter = { _id };
        const user_by_id = (await this.findOne(_id));
        let isExist = user_by_id.role.name !== 'ADMIN' ? true : false;
        if (!isExist) {
            throw new common_1.BadGatewayException(`Bạn không có quyền để xóa tài khoản có email là ${user_by_id.email}!`);
        }
        await this.UserModel.softDelete(filter);
        await this.UserModel.findOneAndUpdate(filter, {
            deletedBy: {
                _id: user._id,
                name: user.username,
            },
        });
        return 'Delete success';
    }
    async find_by_email(email) {
        const user = await this.UserModel.findOne({ email }).populate({
            path: 'role',
            select: {
                _id: 1,
                name: 1,
            },
        });
        return user;
    }
    async find_by_token(token) {
        const user = await this.UserModel.findOne({ refreshToken: token }).populate({
            path: 'role',
            select: {
                _id: 1,
                name: 1,
            },
        });
        return user;
    }
    async update_refreshToken(refreshToken, _id, username) {
        const filter = { _id };
        return await this.UserModel.findOneAndUpdate(filter, {
            refreshToken,
            updatedBy: {
                _id,
                username,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map