import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { EnumOrderStatus } from '@prisma/client';
import * as paypal from '@paypal/checkout-server-sdk';
import { PayPalService } from './paypal.service'; // Asumăm că ai deja acest serviciu definit

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});  

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private payPalService: PayPalService // Adăugăm PayPalService
  ) {}

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

  // Adăugăm logica pentru PayPal
  async createPayPalOrder(total: number, userId: string) {
    const order = await this.prisma.order.create({
      data: {
        total,
        status: EnumOrderStatus.PENDING,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // Creăm o comandă PayPal
    const payPalOrder = await this.payPalService.createOrder(total);

    return {
      id: order.id,
      orderId: payPalOrder.id, // ID-ul comenzii PayPal
      approveLink: payPalOrder.links.find(link => link.rel === 'approve').href, // Link-ul pentru aprobare PayPal
    };
  }

  async capturePayPalOrder(orderId: string) {
    // Capturăm plata PayPal
    const captureResponse = await this.payPalService.captureOrder(orderId);
    
    // Actualizăm statusul comenzii în baza de date
    await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: EnumOrderStatus.PAYED,
      },
    });

    return captureResponse;
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
