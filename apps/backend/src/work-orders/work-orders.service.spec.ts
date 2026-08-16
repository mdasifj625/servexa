import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrdersService } from './work-orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('WorkOrdersService', () => {
  let service: WorkOrdersService;
  let prisma: PrismaService;

  const mockPrismaService = {
    workOrder: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    part: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    invoice: {
      create: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrismaService)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkOrdersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<WorkOrdersService>(WorkOrdersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('completeWorkOrder', () => {
    it('should throw an error if work order is not found', async () => {
      mockPrismaService.workOrder.findUnique.mockResolvedValueOnce(null);

      await expect(service.completeWorkOrder(1)).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if work order is already completed', async () => {
      mockPrismaService.workOrder.findUnique.mockResolvedValueOnce({
        id: 1,
        status: 'COMPLETED',
        items: [],
      });

      await expect(service.completeWorkOrder(1)).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if part stock is insufficient', async () => {
      mockPrismaService.workOrder.findUnique.mockResolvedValueOnce({
        id: 1,
        status: 'OPEN',
        items: [{ partId: 'part1', quantity: 5, price: 100 }],
      });
      mockPrismaService.part.findUnique.mockResolvedValueOnce({
        id: 'part1',
        stock: 2, // Insufficient stock
      });

      await expect(service.completeWorkOrder(1)).rejects.toThrow(BadRequestException);
    });

    it('should deduct inventory, update status, and create invoice', async () => {
      mockPrismaService.workOrder.findUnique.mockResolvedValueOnce({
        id: 1,
        status: 'OPEN',
        items: [{ partId: 'part1', quantity: 2, price: 100 }],
      });
      mockPrismaService.part.findUnique.mockResolvedValueOnce({
        id: 'part1',
        stock: 10,
      });
      mockPrismaService.workOrder.update.mockResolvedValueOnce({ id: 1, status: 'COMPLETED' });

      await service.completeWorkOrder(1);

      // Verify inventory deduction
      expect(mockPrismaService.part.update).toHaveBeenCalledWith({
        where: { id: 'part1' },
        data: { stock: 8 },
      });

      // Verify status update
      expect(mockPrismaService.workOrder.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'COMPLETED' },
      });

      // Verify invoice creation
      expect(mockPrismaService.invoice.create).toHaveBeenCalledWith({
        data: {
          workOrderId: 1,
          totalAmount: 200,
          status: 'UNPAID',
        },
      });
    });
  });
});
