import { CountryCode } from 'libphonenumber-js';
export declare const IRAN_COUNTRY_CODE: CountryCode;
export declare function parseIranPhoneNumber(phone: string): import("libphonenumber-js").PhoneNumber | undefined;
export declare function isValidIranPhoneNumber(phone: string): boolean;
export declare function formatIranPhoneNumber(phone: string, format?: 'national' | 'international' | 'e164'): string | null;
export declare function normalizeIranPhoneNumber(phone: string): string | null;
export declare const IRAN_PHONE_REGEX: RegExp;
export declare function isValidIranPhoneRegex(phone: string): boolean;
