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
exports.CreateTicketDto = void 0;
const class_validator_1 = require("class-validator");
const ticket_category_enum_1 = require("../enums/ticket-category.enum");
const swagger_1 = require("@nestjs/swagger");
const cats = ticket_category_enum_1.categories.map((status) => status).join(', ');
class CreateTicketDto {
    subject;
    category;
    description;
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'موضوع تیکت',
        example: 'مشکل در پرداخت',
    }),
    (0, class_validator_1.IsString)({ message: 'موضوع تیکت باید یک رشته باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'موضوع تیکت نباید خالی باشد باشد' }),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'دسته بندی تیکت',
        example: 'پرداخت',
    }),
    (0, class_validator_1.IsEnum)(ticket_category_enum_1.TicketCategory, {
        message: `دسته بندی تیکت باید یکی از این مقادیر باشد: (${cats})`,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'دسته بندی تیکت نباید خالی باشد باشد' }),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'توضیحات تیکت',
        example: '',
    }),
    (0, class_validator_1.IsString)({ message: 'توضیحات تیکت باید یک رشته باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'توضیحات تیکت نباید خالی باشد باشد' }),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "description", void 0);
//# sourceMappingURL=create-ticket.dto.js.map