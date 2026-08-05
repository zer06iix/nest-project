// import './instrument';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './api/v1/common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './api/v1/common/filters/http-exception.filter';


declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    
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
    
    const config = new DocumentBuilder()
        .setTitle('فروشگاه لباس api')
        .setDescription('برای کلاینت api مستندات و راهنمای مسیر های')
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'jwt',
        )
        // .addApiKey(
        //     {
        //         type: 'apiKey',
        //         name: 'X-API-Key',
        //         in: 'header',
        //     },
        //     'api-key',
        // )
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
        'api/v1/documents',
        app,
        documentFactory,
        {
            customSiteTitle: "مستندات فروشگاه",
        }
    );

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
