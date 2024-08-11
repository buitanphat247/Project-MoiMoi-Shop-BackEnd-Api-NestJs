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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsController = void 0;
const common_1 = require("@nestjs/common");
const auths_service_1 = require("./auths.service");
const local_auth_guard_1 = require("./guard/local-auth.guard");
const customize_1 = require("../../decorator/customize");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const users_service_1 = require("../users/users.service");
let AuthsController = class AuthsController {
    constructor(authsService, usersService) {
        this.authsService = authsService;
        this.usersService = usersService;
    }
    async login(req, res) {
        return await this.authsService.login(req.user, res);
    }
    create(userDto) {
        return this.usersService.register(userDto);
    }
    createMany(userList) {
        return this.usersService.createManyUser(userList);
    }
    refresh(user, req, res) {
        return this.authsService.processNewToken(req, res);
    }
    async handleGetAccount(user) {
        return user;
    }
    handleLogout(response, user) {
        return this.authsService.logout(response, user);
    }
};
exports.AuthsController = AuthsController;
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, customize_1.ResponseMessage)('Login a user'),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthsController.prototype, "login", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Post)('register'),
    (0, customize_1.ResponseMessage)('Register a new user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('createMany'),
    (0, customize_1.Public)(),
    (0, customize_1.ResponseMessage)('Create many users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "createMany", null);
__decorate([
    (0, customize_1.Public)(),
    (0, customize_1.SkipPermission)(),
    (0, common_1.Get)('refresh'),
    (0, customize_1.ResponseMessage)('Get new access token'),
    __param(0, (0, customize_1.User)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "refresh", null);
__decorate([
    (0, customize_1.SkipPermission)(),
    (0, customize_1.ResponseMessage)('Get user information'),
    (0, common_1.Get)('account'),
    __param(0, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthsController.prototype, "handleGetAccount", null);
__decorate([
    (0, customize_1.SkipPermission)(),
    (0, customize_1.ResponseMessage)('Logout User'),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "handleLogout", null);
exports.AuthsController = AuthsController = __decorate([
    (0, common_1.Controller)('auths'),
    __metadata("design:paramtypes", [auths_service_1.AuthsService,
        users_service_1.UsersService])
], AuthsController);
//# sourceMappingURL=auths.controller.js.map