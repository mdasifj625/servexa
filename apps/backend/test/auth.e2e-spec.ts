import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let uniqueEmail = `testuser${Date.now()}@example.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a role and a user
    const prisma = moduleFixture.get<PrismaService>(PrismaService);
    
    // Hash password
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('password123', 10);

    let role = await prisma.role.findFirst({ where: { name: 'Admin' } });
    if (!role) {
      role = await prisma.role.create({ data: { name: 'Admin', description: 'Administrator' } });
    }

    await prisma.user.create({
      data: {
        email: uniqueEmail,
        password: hashedPassword,
        name: 'Test User',
        roleId: role.id
      }
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: uniqueEmail,
        password: 'password123'
      });
      
    expect(response.status).toBe(200); // NestJS default for HttpCode(200) is 200
    expect(response.body).toHaveProperty('access_token');
    expect(response.body.user.email).toBe(uniqueEmail);
  });
});
