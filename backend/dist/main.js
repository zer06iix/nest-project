"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const response_interceptor_1 = require("./api/v1/common/interceptors/response.interceptor");
const http_exception_filter_1 = require("./api/v1/common/filters/http-exception.filter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: process.env.CORS_ORIGIN ?? "http://localhost:3001",
        credentials: true,
    });
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new response_interceptor_1.TransformInterceptor(new core_1.Reflector()));
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: process.env.API_VERSION,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('فروشگاه لباس api')
        .setDescription('برای کلاینت api مستندات و راهنمای مسیر های')
        .setVersion('1.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'توکن دسترسی JWT را وارد کنید',
        in: 'header',
    }, 'jwt')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/documents', app, documentFactory, {
        customSiteTitle: 'مستندات فروشگاه',
    });
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map