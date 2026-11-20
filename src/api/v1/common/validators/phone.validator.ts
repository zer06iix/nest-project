import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import {
    isValidIranPhoneRegex,
    normalizeIranPhoneNumber,
} from '../utils/phone';

@ValidatorConstraint({ async: false })
export class IsIranPhoneNumberConstraint implements ValidatorConstraintInterface {
    validate(phone: string): boolean {
        if (typeof phone !== 'string') return false;
        return isValidIranPhoneRegex(phone);
    }

    defaultMessage(): string {
        return 'شماره موبایل معتبر نیست (فرمت: 09xxxxxxxxx یا +989xxxxxxxxx)';
    }
}

export function IsIranPhoneNumber(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsIranPhoneNumberConstraint,
        });
    };
}

@ValidatorConstraint({ async: false })
export class NormalizeIranPhoneConstraint implements ValidatorConstraintInterface {
    validate(phone: string, args: ValidationArguments): boolean {
        if (typeof phone !== 'string') return false;
        const normalized = normalizeIranPhoneNumber(phone);
        if (normalized) {
            args.object[args.property] = normalized;
            return true;
        }
        return false;
    }

    defaultMessage(): string {
        return 'شماره موبایل معتبر نیست';
    }
}

export function NormalizeIranPhone(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: NormalizeIranPhoneConstraint,
        });
    };
}
