"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_categories_dto_1 = require("./create-categories.dto");
class updateCategoryDto extends (0, mapped_types_1.PartialType)(create_categories_dto_1.CreateCategoryDto) {
}
exports.updateCategoryDto = updateCategoryDto;
//# sourceMappingURL=update-categories.dto.js.map