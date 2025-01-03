// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';
// import { SizeDto } from './dto/size.dto';

// @Injectable()
// export class SizeService {
//   constructor(private prisma: PrismaService) {}

//   async getByStoreId(storeId: string) {
//     return this.prisma.size.findMany({
//         where: {
//             storeId
//             }
//         })
//     }  


//   async getById(id: string) {
//     const size = await this.prisma.size.findUnique({
//       where: { id },
//       include: { products: true },
//     });
//     if (!size) {
//       throw new NotFoundException('Dimensiunea nu a fost găsită.');
//     }
//     return size;
//   }

//   async create(storeId: string, dto: SizeDto) {
//     const { productIds, ...sizeData } = dto;

//     const size = await this.prisma.size.create({
//       data: {
//         ...sizeData,
//         storeId,
//       },
//     });

//     if (productIds?.length) {
//       await this.prisma.size.update({
//         where: { id: size.id },
//         data: {
//           products: {
//             connect: productIds.map((id) => ({ id })),
//           },
//         },
//       });
//     }

//     return size;
//   }

//   async update(id: string, dto: SizeDto) {
//     await this.getById(id);

//     return this.prisma.size.update({
//       where: { id },
//       data: dto,
//     });
//   }

//   async delete(id: string) {
//     await this.getById(id);

//     return this.prisma.size.delete({
//       where: { id },
//     });
//   }
// }
