import axios from 'axios';

export const downloadInvoice = async (invoiceData: any) => {
  try {
    const response = await axios.post('http://localhost:3000/pdf/invoice', invoiceData, {
      responseType: 'blob', // Crucial for receiving binary data
    });

    // Create a blob URL and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice-${invoiceData.id || 'new'}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    if (link.parentNode) link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading the PDF', error);
    throw error;
  }
};
