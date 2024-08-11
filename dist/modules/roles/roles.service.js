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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const role_schema_1 = require("./schema/role.schema");
const mongoose_2 = __importDefault(require("mongoose"));
let RolesService = class RolesService {
    constructor(RoleModel) {
        this.RoleModel = RoleModel;
    }
    async create(createRoleDto, user) {
        const { name, permissions } = createRoleDto;
        return this.RoleModel.create({
            name,
            permissions,
            createdBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async findAll(qs) {
        return this.RoleModel.find({});
    }
    async findOne(_id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException(`Không tìm thấy dữ liệu role có id ${_id}`);
        }
        return this.RoleModel.findOne({ _id }).populate({
            path: 'permissions',
            select: {
                _id: 1,
                apiPath: 1,
                method: 1,
                module: 1,
                name: 1,
            },
        });
    }
    async update(_id, updateRoleDto, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(_id)) {
            throw new common_1.BadRequestException(`Không tìm thấy dữ liệu role có id ${_id}`);
        }
        const { name, permissions } = updateRoleDto;
        return await this.RoleModel.updateOne({ _id }, {
            name,
            permissions,
            updatedBy: {
                _id: user._id,
                username: user.username,
            },
        });
    }
    async remove(id, user) {
        const foundRole = await this.RoleModel.findById(id);
        if (foundRole.name === 'ADMIN') {
            throw new common_1.BadRequestException('Không thể xóa role ADMIN');
        }
        await this.RoleModel.softDelete({
            _id: id,
        });
        await this.RoleModel.updateOne({ _id: id }, {
            deletedBy: {
                _id: user._id,
                username: user.username,
            },
        });
        return 'Delete success';
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object])
], RolesService);
//# sourceMappingURL=roles.service.js.map