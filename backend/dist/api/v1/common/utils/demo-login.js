"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEMO_ADMIN_DISPLAY_NAME = exports.DEMO_ADMIN_ID = void 0;
exports.isDemoLoginEnabled = isDemoLoginEnabled;
exports.isDemoAdminId = isDemoAdminId;
exports.isEmptyDemoLogin = isEmptyDemoLogin;
exports.DEMO_ADMIN_ID = 'demo-admin-1';
exports.DEMO_ADMIN_DISPLAY_NAME = 'مدیر سیستم';
function isDemoLoginEnabled() {
    return process.env.DEMO_LOGIN_ENABLED === 'true';
}
function isDemoAdminId(id) {
    return isDemoLoginEnabled() && id === exports.DEMO_ADMIN_ID;
}
function isBlank(value) {
    if (value === undefined || value === null)
        return true;
    if (typeof value === 'string')
        return value.trim() === '';
    return false;
}
function isEmptyDemoLogin(dto) {
    return isDemoLoginEnabled() && isBlank(dto.phoneNumber) && isBlank(dto.password);
}
//# sourceMappingURL=demo-login.js.map