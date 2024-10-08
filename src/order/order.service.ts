import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { EnumOrderStatus } from '@prisma/client';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2024-06-20',
});  

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map(item => ({
      quantity: item.quantity,
      price: item.price,
      product: {
        connect: {
          id: item.productId,
        },
      },
      store: {
        connect: {
          id: item.storeId,
        },
      },
    }));

    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: orderItems,
        },
        total,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), 
      currency: 'usd',
      payment_method_types: ['card'],
      description: `Payment for an order in the Fynely store. Payment ID: #${order.id}`,
      metadata: { orderId: order.id },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  async updateStatus(dto: PaymentStatusDto) {
    if (dto.event === 'payment.succeeded') {
	  const orderId = dto.object.description.split('#')[1];

      await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: EnumOrderStatus.PAYED,
        },
      });

      return true;
    }

    return true;
  }
}
