import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesService } from './services/attributes.service';
import { AttributesController } from './controllers/attributes.controller';
import { Attribute } from './entities/attribute.entity';
import { AttributeOption } from './entities/attribute-option.entity';
import { UsersModule } from '../users/users.module';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RoleGuard } from '../common/guards/role.guard';

@Module({
	imports: [TypeOrmModule.forFeature([Attribute, AttributeOption]), UsersModule],
	controllers: [AttributesController],
	providers: [AttributesService, JwtAccessGuard, RoleGuard],
})
export class AttributesModule {}
