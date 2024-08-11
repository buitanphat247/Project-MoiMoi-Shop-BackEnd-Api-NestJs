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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const permission_schema_1 = require("./schema/permission.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
let PermissionsService = class PermissionsService {
    constructor(PermissionModel) {
        this.PermissionModel = PermissionModel;
    }
    async create(createPermissionDto, user) {
        const { apiPath, description, module, name, method } = createPermissionDto;
        const isExist = (await this.PermissionModel.findOne({
            apiPath,
            module,
            method,
        }))
            ? false
            : true;
        if (!isExist) {
            throw new common_1.BadRequestException('Permission đã tồn tại vui lòng tạo mới!');
        }
        return await this.PermissionModel.create({
            apiPath,
            description,
            module,
            method,
            name,
            createdBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async createMany(createPermissions, user) {
        createPermissions.map((item, index) => {
            const { apiPath, module, name, method } = item;
            const description = (0, slugify_1.default)(name, { lower: true, replacement: '_' });
            this.PermissionModel.create({
                apiPath,
                module,
                name,
                method,
                description,
                createdBy: {
                    _id: user._id,
                    username: user.username,
                },
            });
        });
    }
    async findAll() {
        return await this.PermissionModel.find({});
    }
    async findOne(_id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException(`Không tìm thấy dữ liệu permission có id ${_id}`);
        }
        return await this.PermissionModel.findOne({ _id });
    }
    async update(_id, updatePermissionDto, user) {
        const { apiPath, description, method, module, name } = updatePermissionDto;
        return await this.PermissionModel.findOneAndUpdate({ _id }, {
            apiPath,
            description,
            method,
            module,
            name,
            updatedBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async delete(_id, user) {
        const filter = { _id };
        await this.PermissionModel.softDelete(filter);
        await this.PermissionModel.findOneAndUpdate(filter, {
            deletedBy: {
                _id: user._id,
                name: user.username,
            },
        });
        return 'Delete success';
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __metadata("design:paramtypes", [Object])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map