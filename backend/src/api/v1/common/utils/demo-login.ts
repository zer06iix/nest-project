export const DEMO_ADMIN_ID = 'demo-admin-1';

/** Default display name for the built-in demo admin (shown in the panel). */
export const DEMO_ADMIN_DISPLAY_NAME = 'مدیر سیستم';

export function isDemoLoginEnabled(): boolean {
    return process.env.DEMO_LOGIN_ENABLED === 'true';
}

/** True when the demo flag is on and the user id is the built-in demo admin. */
export function isDemoAdminId(id?: string): boolean {
    return isDemoLoginEnabled() && id === DEMO_ADMIN_ID;
}

function isBlank(value: unknown): boolean {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string') return value.trim() === '';
    return false;
}

/**
 * True when the demo flag is on and both login fields were left empty
 * (or only whitespace). Used by LoginDto ValidateIf and AuthService.login.
 */
export function isEmptyDemoLogin(dto: { phoneNumber?: unknown; password?: unknown }): boolean {
    return isDemoLoginEnabled() && isBlank(dto.phoneNumber) && isBlank(dto.password);
}
