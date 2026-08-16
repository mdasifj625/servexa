import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PrismaModule } from './prisma/prisma.module';
import { PartsModule } from './parts/parts.module';
import { PdfModule } from './pdf/pdf.module';
import { CustomersModule } from './customers/customers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { ServicesModule } from './services/services.module';
import { InventoryModule } from './inventory/inventory.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { PurchasesModule } from './purchases/purchases.module';
import { BillingModule } from './billing/billing.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [AuthModule, UsersModule, RolesModule, PrismaModule, PartsModule, PdfModule, CustomersModule, VehiclesModule, AppointmentsModule, WorkOrdersModule, ServicesModule, InventoryModule, SuppliersModule, PurchasesModule, BillingModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
