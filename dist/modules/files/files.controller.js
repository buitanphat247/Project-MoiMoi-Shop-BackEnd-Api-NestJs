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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const customize_1 = require("../../decorator/customize");
const config_1 = require("@nestjs/config");
let FilesController = class FilesController {
    constructor(filesService, configService) {
        this.filesService = filesService;
        this.configService = configService;
    }
    uploadFile(file) {
        return {
            name: file.filename,
        };
    }
    delete(fileName, folderType) {
        const upload_path = this.configService.get('PATH_UPLOAD_FILE');
        const uploadPath = folderType
            ? upload_path + `/${folderType}/${fileName}`
            : upload_path + `/file/${fileName}`;
        console.log('uploadPath: ', uploadPath);
        try {
            (0, fs_1.unlinkSync)(`${uploadPath}`);
        }
        catch (error) {
            console.log(error);
        }
        return true;
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file_content')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('folder_type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "delete", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        config_1.ConfigService])
], FilesController);
//# sourceMappingURL=files.controller.js.map