import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllInvoices() {
    return this.prisma.invoice.findMany({
      include: {
        workOrder: {
          include: { customer: true, vehicle: true }
        },
        payment: true,
      },
      orderBy: { issuedAt: 'desc' },
    });
  }

  async markAsPaid(invoiceId: number, method: string) {
    return this.prisma.$transaction(async (prisma) => {
      const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
      if (!invoice) throw new Error('Invoice not found');
      
      const payment = await prisma.payment.create({
        data: {
          invoiceId,
          amount: invoice.totalAmount,
          method,
        }
      });

      await prisma.invoice.update({
        where: { id: invoiceId },
        data: { status: 'PAID' },
      });

      return payment;
    });
  }
}
