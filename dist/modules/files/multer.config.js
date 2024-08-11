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
exports.MulterConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const isExistPath = (path) => { };
let MulterConfigService = class MulterConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    createMulterOptions() {
        const upload_path = this.configService.get('PATH_UPLOAD_FILE');
        return {
            storage: (0, multer_1.diskStorage)({
                destination: function (req, file, cb) {
                    const { folder_type } = req.headers;
                    const uploadPath = folder_type
                        ? upload_path + `/${folder_type}`
                        : upload_path + '/file';
                    if (!(0, fs_1.existsSync)(uploadPath)) {
                        (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
                    }
                    cb(null, uploadPath);
                },
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
                },
            }),
        };
    }
};
exports.MulterConfigService = MulterConfigService;
exports.MulterConfigService = MulterConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MulterConfigService);
//# sourceMappingURL=multer.config.js.map