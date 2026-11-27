import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Category } from '../categories/entities/category.entity';
import { CategoryAttribute } from '../attributes/entities/category-attribute.entity';
import { Attribute } from '../attributes/entities/attribute.entity';
import { AttributeOption } from '../attributes/entities/attribute-option.entity';
import { StoreProduct } from '../stores/entities/store-product.entity';
import { Brand } from './entities/brand.entity';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { VariantAttributeValue } from './entities/variant-attribute-value.entity';
import { ProductIdentifier } from './entities/product-identifier.entity';
import { BrandsController } from './brands.controller';
import { ProductsController } from './products.controller';
import { BrandsService } from './brands.service';
import { ProductsService } from './products.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Brand,
			Product,
			ProductVariant,
			ProductImage,
			ProductAttributeValue,
			VariantAttributeValue,
			ProductIdentifier,
			Category,
			CategoryAttribute,
			Attribute,
			AttributeOption,
			StoreProduct,
		]),
		UsersModule,
	],
	controllers: [BrandsController, ProductsController],
	providers: [BrandsService, ProductsService, JwtAccessGuard, RoleGuard],
	exports: [ProductsService],
})
export class ProductsModule {}
