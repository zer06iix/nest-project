"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRAN_PHONE_REGEX = exports.IRAN_COUNTRY_CODE = void 0;
exports.parseIranPhoneNumber = parseIranPhoneNumber;
exports.isValidIranPhoneNumber = isValidIranPhoneNumber;
exports.formatIranPhoneNumber = formatIranPhoneNumber;
exports.normalizeIranPhoneNumber = normalizeIranPhoneNumber;
exports.isValidIranPhoneRegex = isValidIranPhoneRegex;
const libphonenumber_js_1 = require("libphonenumber-js");
exports.IRAN_COUNTRY_CODE = 'IR';
function parseIranPhoneNumber(phone) {
    return (0, libphonenumber_js_1.parsePhoneNumberFromString)(phone, exports.IRAN_COUNTRY_CODE);
}
function isValidIranPhoneNumber(phone) {
    return (0, libphonenumber_js_1.isValidPhoneNumber)(phone, exports.IRAN_COUNTRY_CODE);
}
function formatIranPhoneNumber(phone, format = 'e164') {
    const parsed = parseIranPhoneNumber(phone);
    if (!parsed)
        return null;
    switch (format) {
        case 'national':
            return parsed.formatNational();
        case 'international':
            return parsed.formatInternational();
        case 'e164':
            return parsed.format('E.164');
    }
}
function normalizeIranPhoneNumber(phone) {
    const parsed = parseIranPhoneNumber(phone);
    if (!parsed)
        return null;
    return parsed.format('E.164').replace('+', '');
}
exports.IRAN_PHONE_REGEX = /^(\+98|0)?9\d{9}$/;
function isValidIranPhoneRegex(phone) {
    return exports.IRAN_PHONE_REGEX.test(phone.trim());
}
//# sourceMappingURL=phone.js.map