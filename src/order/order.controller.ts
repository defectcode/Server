import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
  } from '@nestjs/common';
  import { Auth } from 'src/auth/decorators/auth.decorator';
  import { CurrentUser } from 'src/user/decorators/user.decorator';
  import { OrderDto } from './dto/order.dto';
  import { PaymentStatusDto } from './dto/payment-status.dto';
  import { OrderService } from './order.service';
  
  @Controller('orders')
  export class OrderController {
	constructor(private readonly orderService: OrderService) {}
  
	// Endpoint pentru Stripe
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('place')
	@Auth()
	async checkout(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
	  return this.orderService.createPayment(dto, userId);
	}
  
	// Endpoint pentru actualizarea statusului plății (Stripe/PayPal)
	@HttpCode(200)
	@Post('status')
	async updateStatus(@Body() dto: PaymentStatusDto) {
	  return this.orderService.updateStatus(dto);
	}
  
	// Endpoint pentru crearea unei comenzi PayPal
	@Post('paypal/create')
	@HttpCode(200)
	@Auth()
	async createPayPalOrder(
	  @Body('total') total: number,
	  @CurrentUser('id') userId: string,
	) {
	  return this.orderService.createPayPalOrder(total, userId);
	}
  
	// Endpoint pentru capturarea plății PayPal
	@Post('paypal/capture')
	@HttpCode(200)
	async capturePayPalOrder(@Body('orderId') orderId: string) {
	  return this.orderService.capturePayPalOrder(orderId);
	}
  }
  