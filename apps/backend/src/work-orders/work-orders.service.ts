import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.workOrder.create({
      data: {
        customerId: data.customerId,
        vehicleId: data.vehicleId,
        mechanicId: data.mechanicId,
        status: 'OPEN',
        items: {
          create: data.items.map((item: any) => ({
            serviceId: item.serviceId,
            partId: item.partId,
            quantity: item.quantity || 1,
            price: item.price,
          })),
        }
      },
      include: { items: true, customer: true, vehicle: true },
    });
  }

  async findAll() {
    return this.prisma.workOrder.findMany({
      include: { customer: true, vehicle: true, mechanic: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.workOrder.findUnique({
      where: { id },
      include: { 
        items: { include: { part: true, service: true } }, 
        customer: true, 
        vehicle: true, 
        mechanic: true 
      },
    });
  }

  async completeWorkOrder(id: number) {
    return this.prisma.$transaction(async (prisma) => {
      const workOrder = await prisma.workOrder.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!workOrder) throw new BadRequestException('Work order not found');
      if (workOrder.status === 'COMPLETED') throw new BadRequestException('Work order already completed');

      // Deduct inventory
      for (const item of workOrder.items) {
        if (item.partId) {
          const part = await prisma.part.findUnique({ where: { id: item.partId } });
          if (!part || part.stock < item.quantity) {
            throw new BadRequestException(`Insufficient stock for part ID: ${item.partId}`);
          }
          await prisma.part.update({
            where: { id: item.partId },
            data: { stock: part.stock - item.quantity },
          });
        }
      }

      // Mark as completed
      const updatedOrder = await prisma.workOrder.update({
        where: { id },
        data: { status: 'COMPLETED' },
      });
      
      // Auto-generate invoice
      const totalAmount = workOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await prisma.invoice.create({
        data: {
          workOrderId: id,
          totalAmount,
          status: 'UNPAID',
        }
      });

      return updatedOrder;
    });
  }

  async updateStatus(id: number, status: string) {
    if (status === 'COMPLETED') {
      return this.completeWorkOrder(id);
    }
    return this.prisma.workOrder.update({
      where: { id },
      data: { status },
    });
  }
}
