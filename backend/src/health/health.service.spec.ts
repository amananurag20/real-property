import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma';

describe('HealthService', () => {
  let service: HealthService;
  let healthCheckService: HealthCheckService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            client: {
              $queryRaw: jest.fn().mockResolvedValue([{}]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('check', () => {
    it('should return health check result', async () => {
      const mockResult: HealthCheckResult = {
        status: 'ok',
        info: { database: { status: 'up' } },
        error: {},
        details: { database: { status: 'up' } },
      };

      jest
        .spyOn(healthCheckService, 'check')
        .mockResolvedValue(mockResult as any);

      const result = await service.check();
      expect(result).toBe(mockResult);
      expect(healthCheckService.check).toHaveBeenCalled();
    });

    it('should call prisma health indicator', async () => {
      // Mock the implementation of healthCheckService.check to execute the callback
      jest
        .spyOn(healthCheckService, 'check')
        .mockImplementation(async (indicators) => {
          // Execute the first indicator function passed to check()
          await indicators[0]();
          return { status: 'ok' } as any;
        });

      await service.check();
      expect(prismaService.client.$queryRaw).toHaveBeenCalledWith(
        expect.anything(),
      );
    });
  });
});
