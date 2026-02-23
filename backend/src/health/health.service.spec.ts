import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from '@health/health.service';
import { RedisHealthIndicator } from '@redis';

describe('HealthService', () => {
  let service: HealthService;
  let healthCheckService: HealthCheckService;
  let redisHealthIndicator: RedisHealthIndicator;

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
          provide: RedisHealthIndicator,
          useValue: {
            isHealthy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    redisHealthIndicator =
      module.get<RedisHealthIndicator>(RedisHealthIndicator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('check', () => {
    it('should return health check result', async () => {
      const mockResult: HealthCheckResult = {
        status: 'ok',
        info: { redis: { status: 'up' } },
        error: {},
        details: { redis: { status: 'up' } },
      };

      jest
        .spyOn(healthCheckService, 'check')
        .mockResolvedValue(mockResult as any);

      const result = await service.check();
      expect(result).toBe(mockResult);
      expect(healthCheckService.check).toHaveBeenCalled();
    });

    it('should call redis health indicator', async () => {
      // Mock the implementation of healthCheckService.check to execute the callback
      jest
        .spyOn(healthCheckService, 'check')
        .mockImplementation(async (indicators) => {
          // Execute the first indicator function passed to check()
          await indicators[0]();
          return { status: 'ok' } as any;
        });

      await service.check();
      expect(redisHealthIndicator.isHealthy).toHaveBeenCalledWith('redis');
    });
  });
});
