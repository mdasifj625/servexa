import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  async generateInvoice(invoiceData: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];
      
      doc.on('data', (buffer) => buffers.push(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Header
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('Servexa Auto Shop', { align: 'center' })
        .moveDown();

      doc
        .fontSize(14)
        .font('Helvetica')
        .text('Invoice', { align: 'center' })
        .moveDown();

      // Invoice Details
      doc
        .fontSize(12)
        .text(`Invoice ID: ${invoiceData.id || 'INV-001'}`)
        .text(`Date: ${new Date().toLocaleDateString()}`)
        .text(`Customer Name: ${invoiceData.customerName || 'John Doe'}`)
        .moveDown();

      // Line Items
      doc.font('Helvetica-Bold').text('Items & Services:');
      doc.font('Helvetica').moveDown(0.5);

      let total = 0;
      if (invoiceData.items && Array.isArray(invoiceData.items)) {
        invoiceData.items.forEach((item: any) => {
          doc.text(`${item.name} - $${item.price.toFixed(2)}`);
          total += item.price;
        });
      } else {
        doc.text('Oil Change - $50.00');
        doc.text('Brake Pad Replacement - $150.00');
        total = 200.00;
      }

      doc.moveDown();
      doc.font('Helvetica-Bold').text(`Total: $${total.toFixed(2)}`, { align: 'right' });

      // Footer
      doc
        .moveDown(4)
        .font('Helvetica')
        .fontSize(10)
        .text('Thank you for your business!', { align: 'center' });

      doc.end();
    });
  }
}

