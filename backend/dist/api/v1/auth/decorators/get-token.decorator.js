"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetToken = void 0;
const common_1 = require("@nestjs/common");
exports.GetToken = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader)
        return undefined;
    return authHeader.split(' ')[1];
});
//# sourceMappingURL=get-token.decorator.js.map