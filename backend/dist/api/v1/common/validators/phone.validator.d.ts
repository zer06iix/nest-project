import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsIranPhoneNumberConstraint implements ValidatorConstraintInterface {
    validate(phone: string): boolean;
    defaultMessage(): string;
}
export declare function IsIranPhoneNumber(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare class NormalizeIranPhoneConstraint implements ValidatorConstraintInterface {
    validate(phone: string, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
export declare function NormalizeIranPhone(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
