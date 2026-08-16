import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' },
  });
  const advisorRole = await prisma.role.upsert({
    where: { name: 'Service Advisor' },
    update: {},
    create: { name: 'Service Advisor' },
  });
  const mechanicRole = await prisma.role.upsert({
    where: { name: 'Mechanic' },
    update: {},
    create: { name: 'Mechanic' },
  });

  // 2. Users
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@servexa.com' },
    update: {},
    create: { email: 'admin@servexa.com', name: 'Super Admin', password: hashedPassword, roleId: adminRole.id },
  });
  const mechanicUser = await prisma.user.upsert({
    where: { email: 'mechanic@servexa.com' },
    update: {},
    create: { email: 'mechanic@servexa.com', name: 'John Mechanic', password: hashedPassword, roleId: mechanicRole.id },
  });
  const advisorUser = await prisma.user.upsert({
    where: { email: 'advisor@servexa.com' },
    update: {},
    create: { email: 'advisor@servexa.com', name: 'Sarah Advisor', password: hashedPassword, roleId: advisorRole.id },
  });

  // 3. Customers
  const customer1 = await prisma.customer.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '555-0100', address: '123 Main St' },
  });
  const customer2 = await prisma.customer.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '555-0200', address: '456 Oak Ave' },
  });

  // 4. Vehicles
  const vehicle1 = await prisma.vehicle.upsert({
    where: { licensePlate: 'XYZ-1234' },
    update: {},
    create: { make: 'Toyota', model: 'Camry', year: 2019, licensePlate: 'XYZ-1234', customerId: customer1.id },
  });
  const vehicle2 = await prisma.vehicle.upsert({
    where: { licensePlate: 'ABC-9876' },
    update: {},
    create: { make: 'Honda', model: 'Civic', year: 2021, licensePlate: 'ABC-9876', customerId: customer2.id },
  });

  // 5. Services
  const oilChange = await prisma.service.create({
    data: { name: 'Synthetic Oil Change', description: 'Full synthetic oil and filter change', price: 59.99, duration: 30 },
  });
  const brakePad = await prisma.service.create({
    data: { name: 'Brake Pad Replacement', description: 'Replace front and rear brake pads', price: 150.00, duration: 120 },
  });

  // 6. Parts
  const partOilFilter = await prisma.part.create({
    data: { name: 'Oil Filter X1', description: 'Standard synthetic oil filter', price: 12.99, stock: 50 },
  });
  const partBrakePads = await prisma.part.create({
    data: { name: 'Ceramic Brake Pads', description: 'Premium ceramic pads', price: 89.99, stock: 20 },
  });

  // 7. Suppliers
  const supplier1 = await prisma.supplier.create({
    data: { name: 'AutoParts Wholesale', contact: 'contact@autoparts.com' },
  });

  // 8. Purchases
  await prisma.purchase.create({
    data: { supplierId: supplier1.id, partId: partOilFilter.id, quantity: 50, cost: 8.00 },
  });

  // 9. Appointments
  await prisma.appointment.create({
    data: { appointmentDate: new Date(new Date().getTime() + 86400000), status: 'SCHEDULED', customerId: customer1.id, vehicleId: vehicle1.id },
  });

  // 10. Work Orders & Invoices
  const workOrder = await prisma.workOrder.create({
    data: {
      status: 'COMPLETED',
      customerId: customer1.id,
      vehicleId: vehicle1.id,
      mechanicId: mechanicUser.id,
      items: {
        create: [
          { serviceId: oilChange.id, quantity: 1, price: 59.99 },
          { partId: partOilFilter.id, quantity: 1, price: 12.99 }
        ]
      }
    }
  });

  const invoice = await prisma.invoice.create({
    data: {
      workOrderId: workOrder.id,
      totalAmount: 72.98,
      status: 'PAID'
    }
  });

  await prisma.payment.create({
    data: {
      invoiceId: invoice.id,
      amount: 72.98,
      method: 'CARD'
    }
  });

  console.log('Seed executed successfully with dummy data for all routes!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
