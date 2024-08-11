"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipPermission = exports.IS_PUBLIC_PERMISSION_KEY = exports.User = exports.Public = exports.IS_PUBLIC_KEY = exports.ResponseMessage = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const ResponseMessage = (message) => (0, common_1.SetMetadata)('responseMessage', message);
exports.ResponseMessage = ResponseMessage;
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.User = (0, common_2.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
exports.IS_PUBLIC_PERMISSION_KEY = 'isPublicPermission';
const SkipPermission = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_PERMISSION_KEY, true);
exports.SkipPermission = SkipPermission;
//# sourceMappingURL=customize.js.map