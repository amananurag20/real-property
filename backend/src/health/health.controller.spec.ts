import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckResult } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: jest.Mocked<HealthService>;

  const mockHealthResult: HealthCheckResult = {
    status: 'ok',
    info: {},
    error: {},
    details: {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            check: jest.fn().mockResolvedValue(mockHealthResult),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthService = module.get(HealthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should return health check result with status ok', async () => {
      const result = await controller.check();

      expect(result).toEqual(mockHealthResult);
      expect(result.status).toBe('ok');
    });

    it('should call HealthService.check once', async () => {
      await controller.check();

      expect(healthService.check).toHaveBeenCalledTimes(1);
    });

    it('should propagate errors from HealthService', async () => {
      const error = new Error('Health check failed');
      healthService.check.mockRejectedValueOnce(error);

      await expect(controller.check()).rejects.toThrow('Health check failed');
    });
  });
});
