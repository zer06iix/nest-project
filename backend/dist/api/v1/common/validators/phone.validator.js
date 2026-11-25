"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizeIranPhoneConstraint = exports.IsIranPhoneNumberConstraint = void 0;
exports.IsIranPhoneNumber = IsIranPhoneNumber;
exports.NormalizeIranPhone = NormalizeIranPhone;
const class_validator_1 = require("class-validator");
const phone_1 = require("../utils/phone");
let IsIranPhoneNumberConstraint = class IsIranPhoneNumberConstraint {
    validate(phone) {
        if (typeof phone !== 'string')
            return false;
        return (0, phone_1.isValidIranPhoneRegex)(phone);
    }
    defaultMessage() {
        return 'شماره موبایل معتبر نیست (فرمت: 09xxxxxxxxx یا +989xxxxxxxxx)';
    }
};
exports.IsIranPhoneNumberConstraint = IsIranPhoneNumberConstraint;
exports.IsIranPhoneNumberConstraint = IsIranPhoneNumberConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsIranPhoneNumberConstraint);
function IsIranPhoneNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsIranPhoneNumberConstraint,
        });
    };
}
let NormalizeIranPhoneConstraint = class NormalizeIranPhoneConstraint {
    validate(phone, args) {
        if (typeof phone !== 'string')
            return false;
        const normalized = (0, phone_1.normalizeIranPhoneNumber)(phone);
        if (normalized) {
            args.object[args.property] = normalized;
            return true;
        }
        return false;
    }
    defaultMessage() {
        return 'شماره موبایل معتبر نیست';
    }
};
exports.NormalizeIranPhoneConstraint = NormalizeIranPhoneConstraint;
exports.NormalizeIranPhoneConstraint = NormalizeIranPhoneConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], NormalizeIranPhoneConstraint);
function NormalizeIranPhone(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: NormalizeIranPhoneConstraint,
        });
    };
}
//# sourceMappingURL=phone.validator.js.map