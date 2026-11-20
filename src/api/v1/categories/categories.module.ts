import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { CategoryAttribute } from '../attributes/entities/category-attribute.entity';
import { Attribute } from '../attributes/entities/attribute.entity';
import { UsersModule } from '../users/users.module';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, CategoryAttribute, Attribute]),
        UsersModule,
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService, JwtAccessGuard, RoleGuard],
})
export class CategoriesModule {}
