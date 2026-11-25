import { parsePhoneNumberFromString, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

export const IRAN_COUNTRY_CODE: CountryCode = 'IR';

export function parseIranPhoneNumber(phone: string) {
    return parsePhoneNumberFromString(phone, IRAN_COUNTRY_CODE);
}

export function isValidIranPhoneNumber(phone: string): boolean {
    return isValidPhoneNumber(phone, IRAN_COUNTRY_CODE);
}

export function formatIranPhoneNumber(
    phone: string,
    format: 'national' | 'international' | 'e164' = 'e164',
): string | null {
    const parsed = parseIranPhoneNumber(phone);
    if (!parsed) return null;

    switch (format) {
        case 'national':
            return parsed.formatNational();
        case 'international':
            return parsed.formatInternational();
        case 'e164':
            return parsed.format('E.164');
    }
}

export function normalizeIranPhoneNumber(phone: string): string | null {
    const parsed = parseIranPhoneNumber(phone);
    if (!parsed) return null;
    return parsed.format('E.164').replace('+', '');
}

export const IRAN_PHONE_REGEX = /^(\+98|0)?9\d{9}$/;

export function isValidIranPhoneRegex(phone: string): boolean {
    return IRAN_PHONE_REGEX.test(phone.trim());
}
