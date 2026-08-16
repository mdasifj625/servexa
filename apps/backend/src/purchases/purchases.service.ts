import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Create the purchase record
      const purchase = await prisma.purchase.create({
        data: {
          supplierId: data.supplierId,
          partId: data.partId,
          quantity: data.quantity,
          cost: data.cost,
        },
      });

      // 2. Increase inventory stock
      await prisma.part.update({
        where: { id: data.partId },
        data: {
          stock: { increment: data.quantity },
        },
      });

      return purchase;
    });
  }

  async findAll() {
    return this.prisma.purchase.findMany({
      include: { supplier: true, part: true },
      orderBy: { purchaseDate: 'desc' },
    });
  }
}
