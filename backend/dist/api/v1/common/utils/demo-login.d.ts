export declare const DEMO_ADMIN_ID = "demo-admin-1";
export declare const DEMO_ADMIN_DISPLAY_NAME = "\u0645\u062F\u06CC\u0631 \u0633\u06CC\u0633\u062A\u0645";
export declare function isDemoLoginEnabled(): boolean;
export declare function isDemoAdminId(id?: string): boolean;
export declare function isEmptyDemoLogin(dto: {
    phoneNumber?: unknown;
    password?: unknown;
}): boolean;
