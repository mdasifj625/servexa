import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.customer.create({ data });
  }

  findAll() {
    return this.prisma.customer.findMany({
      include: { vehicles: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: { vehicles: true, workOrders: true, appointments: true }
    });
  }

  update(id: number, data: any) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
