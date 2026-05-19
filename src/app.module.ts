import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'


@Module({
    imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			port: 3306,
			host: 'localhost',
			username: 'root',
			password: '',
			database: 'nestjs_project',
			autoLoadEntities: true,
			synchronize: true
		}),
	]
})
export class AppModule {}
