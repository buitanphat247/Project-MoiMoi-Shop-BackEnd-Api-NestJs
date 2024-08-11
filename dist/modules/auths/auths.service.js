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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const roles_service_1 = require("../roles/roles.service");
let AuthsService = class AuthsService {
    constructor(usersService, jwtService, config, roleService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.config = config;
        this.roleService = roleService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.find_by_email(email);
        if (user && this.usersService.check_password(password, user?.password)) {
            const { _id } = user.role;
            const { permissions } = await this.roleService.findOne(_id.toString());
            const userObject = user.toObject();
            return {
                ...userObject,
                permissions,
            };
        }
        return null;
    }
    async login(user, res) {
        const { _id, email, role, username, address, age, phone, gender, permissions, } = user;
        const payload = { _id, email, role, username, address, age, phone, gender };
        const refresh_token = await this.createRefresthToken(payload);
        const access_token = await this.createAccessToken(payload);
        await this.usersService.update_refreshToken(refresh_token, _id.toString(), username);
        res.cookie('refresh_token', refresh_token);
        return {
            access_token,
            meta: {
                _id,
                email,
                role,
                username,
                address,
                age,
                phone,
                gender,
                permissions,
            },
        };
    }
    async createRefresthToken(payload) {
        const refresthToken = this.jwtService.sign(payload, {
            expiresIn: '100000d',
        });
        return refresthToken;
    }
    async createAccessToken(payload) {
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '100000d',
        });
        return accessToken;
    }
    async processNewToken(req, res) {
        const refresh_token = req.cookies['refresh_token'];
        try {
            const payload = this.jwtService.verify(refresh_token, {
                secret: this.config.get('JWT_SECRET'),
            });
            const user = await this.usersService.find_by_token(refresh_token);
            if (user) {
                const { _id, email, role, username, address, age, phone, gender } = user;
                const payload = {
                    _id,
                    email,
                    role,
                    username,
                    address,
                    age,
                    phone,
                    gender,
                };
                const refresh_token = await this.createRefresthToken(payload);
                const access_token = await this.createAccessToken(payload);
                await this.usersService.update_refreshToken(refresh_token, _id.toString(), username);
                res.cookie('refresh_token', refresh_token);
                return {
                    access_token,
                    meta: {
                        _id,
                        username,
                        email,
                        role,
                    },
                };
            }
        }
        catch (e) {
            throw new common_1.BadRequestException(`Refresh token không hợp lệ. Vui lòng login lại!`);
        }
    }
    async logout(response, user) {
        await this.usersService.update_refreshToken('', user._id.toString(), user.username);
        response.clearCookie('refresh_token');
        return 'ok';
    }
};
exports.AuthsService = AuthsService;
exports.AuthsService = AuthsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        roles_service_1.RolesService])
], AuthsService);
//# sourceMappingURL=auths.service.js.map