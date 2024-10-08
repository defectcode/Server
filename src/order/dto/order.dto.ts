import { EnumOrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

export class OrderDto {
	@IsOptional()
	@IsEnum(EnumOrderStatus, {
		message: 'Order status is required'
	})
	status: EnumOrderStatus

	@IsArray({
		message: 'There are no items in the order'
	})
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[]
	customerEmail: any
	storeName: any
}

export class OrderItemDto {
	@IsNumber({}, { message: 'Quantity must be a number' })
	quantity: number

	@IsNumber({}, { message: 'The price must be a number' })
	price: number

	@IsString({ message: 'Product ID must be a string' })
	productId: string

	@IsString({ message: 'Store ID must be a string' })
	storeId: string
}
