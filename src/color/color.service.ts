import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ColorDto } from './dto/color.dto'

@Injectable()
export class ColorService {
	constructor(private prisma: PrismaService) {}

	async getByStoreId(storeId: string) {
		return this.prisma.color.findMany({
			where: {
				storeId
			}
		})
	}

	async getById(id: string) {
		const color = await this.prisma.color.findUnique({
			where: {
				id
			}
		})

		if (!color) throw new NotFoundException('Цвет не найден')

		return color
	}

	async create(storeId: string, dto: ColorDto) {
		const { productIds, ...colorData } = dto;
	  
		const color = await this.prisma.color.create({
		  data: {
			...colorData,
			storeId
		  }
		});
	  
		if (productIds?.length) {
		  await this.prisma.color.update({
			where: { id: color.id },
			data: {
			  products: {
				connect: productIds.map((id) => ({ id }))
			  }
			}
		  });
		}
	  
		return color;
	}	  

	async update(id: string, dto: ColorDto) {
		await this.getById(id)

		return this.prisma.color.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prisma.color.delete({
			where: { id }
		})
	}
}
