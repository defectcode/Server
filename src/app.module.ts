import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { ColorModule } from './color/color.module'
import { FileModule } from './file/file.module'
import { OrderModule } from './order/order.module'
import { StatisticsModule } from './statistics/statistics.module'
import { StoreModule } from './store/store.module'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { SizeModule } from './sizes/size.module'
import { EmailModule } from './email/email.module'
@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ColorModule,
		CategoryModule,
		FileModule,
		StoreModule,
		OrderModule,
		StatisticsModule,
		ProductModule,
		ReviewModule,
		SizeModule,
		EmailModule,
	]
})
export class AppModule {}
