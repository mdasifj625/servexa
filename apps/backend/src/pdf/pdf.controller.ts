import { Controller, Post, Body, Res, UseGuards, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { PdfService } from './pdf.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('pdf')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('invoice')
  @Roles('Admin', 'Service Advisor')
  async generateInvoice(@Body() invoiceData: any, @Res() res: Response) {
    try {
      const pdfBuffer = await this.pdfService.generateInvoice(invoiceData);
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to generate PDF' });
    }
  }
}

