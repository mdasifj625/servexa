import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { downloadInvoice } from '@/api/pdf';
import { FileText, Download } from 'lucide-react';

export default function InvoicesPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      setIsGenerating(true);
      // Dummy invoice data, would typically come from an API based on invoiceId
      const invoiceData = {
        id: invoiceId,
        customerName: 'Jane Smith',
        items: [
          { name: 'Engine Oil Filter', price: 15.99 },
          { name: 'Synthetic Oil (5W-30)', price: 45.00 },
          { name: 'Labor (1 hr)', price: 90.00 }
        ]
      };
      
      await downloadInvoice(invoiceData);
    } catch (error) {
      console.error('Failed to generate invoice PDF', error);
      alert('Failed to generate invoice PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const dummyInvoices = [
    { id: 'INV-1020', date: '2026-08-01', customer: 'John Doe', amount: 200.00 },
    { id: 'INV-1021', date: '2026-08-10', customer: 'Jane Smith', amount: 150.99 },
    { id: 'INV-1022', date: '2026-08-11', customer: 'Acme Corp', amount: 450.50 }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <Button><FileText className="w-4 h-4 mr-2" /> Create Invoice</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Manage and download generated PDF invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Invoice ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border">
                    <td className="px-6 py-4 font-medium">{invoice.id}</td>
                    <td className="px-6 py-4">{invoice.date}</td>
                    <td className="px-6 py-4">{invoice.customer}</td>
                    <td className="px-6 py-4 text-right">${invoice.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDownloadInvoice(invoice.id)}
                        disabled={isGenerating}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
