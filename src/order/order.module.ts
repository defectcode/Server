import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PayPalService } from './paypal.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, PayPalService],
})
export class OrderModule {}
