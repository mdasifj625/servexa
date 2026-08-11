import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' },
  });

  const serviceAdvisorRole = await prisma.role.upsert({
    where: { name: 'Service Advisor' },
    update: {},
    create: { name: 'Service Advisor' },
  });

  const mechanicRole = await prisma.role.upsert({
    where: { name: 'Mechanic' },
    update: {},
    create: { name: 'Mechanic' },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@servexa.com' },
    update: {},
    create: {
      email: 'admin@servexa.com',
      name: 'Super Admin',
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log('Seed executed successfully');
  console.log('Admin user:', adminUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
