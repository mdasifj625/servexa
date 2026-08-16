import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.appointment.findMany({
      include: {
        customer: true,
        vehicle: true,
      },
    });
  }
}
