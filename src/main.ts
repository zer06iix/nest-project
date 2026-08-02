import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './api/v1/common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './api/v1/common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
    app.useGlobalFilters(new AllExceptionsFilter());

    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: process.env.API_VERSION,
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
