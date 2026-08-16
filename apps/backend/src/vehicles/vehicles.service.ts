import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.vehicle.create({ data });
  }

  findAll() {
    return this.prisma.vehicle.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.vehicle.findUnique({
      where: { id },
      include: { customer: true, workOrders: true, appointments: true }
    });
  }

  update(id: number, data: any) {
    return this.prisma.vehicle.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.vehicle.delete({ where: { id } });
  }
}
