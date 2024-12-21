import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;
  let service: ApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [ApplicationsService],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
    service = module.get<ApplicationsService>(ApplicationsService);
  });

  // Test getAllApplications method
  describe('getAllApplications', () => {
    it('should return applications wrapped in an object', () => {
      const result = controller.getAllApplications();
      expect(result).toHaveProperty('applications');
      expect(Array.isArray(result.applications)).toBe(true);
      expect(result.applications.length).toBe(16);
    });

    it('should return the same data as service', () => {
      const controllerResult = controller.getAllApplications();
      const serviceResult = service.getAllApplications();
      expect(controllerResult.applications).toEqual(serviceResult);
    });
  });

  // Test getStats method
  describe('getStats', () => {
    it('should return stats wrapped in an object', () => {
      const result = controller.getStats();
      expect(result).toHaveProperty('stats');
      expect(result.stats).toHaveProperty('total');
      expect(result.stats).toHaveProperty('pending');
      expect(result.stats).toHaveProperty('accepted');
      expect(result.stats).toHaveProperty('rejected');
      expect(result.stats).toHaveProperty('byMonth');
    });

    it('should return the same stats as service', () => {
      const controllerResult = controller.getStats();
      const serviceResult = service.getStats();
      expect(controllerResult.stats).toEqual(serviceResult);
    });
  });
});
