import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationsService],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  describe('getAllApplications', () => {
    it('should return all applications', () => {
      const applications = service.getAllApplications();
      expect(applications).toBeDefined();
      expect(Array.isArray(applications)).toBe(true);
      expect(applications.length).toBe(16);

      // Test structure of a single application
      const firstApp = applications[0];
      expect(firstApp).toHaveProperty('id');
      expect(firstApp).toHaveProperty('jobTitle');
      expect(firstApp).toHaveProperty('companyName');
      expect(firstApp).toHaveProperty('status');
      expect(firstApp).toHaveProperty('dateApplied');
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', () => {
      const stats = service.getStats();

      // Test total count
      expect(stats.total).toBe(16);

      // Test status counts
      expect(stats.pending).toBe(6);
      expect(stats.accepted).toBe(5);
      expect(stats.rejected).toBe(5);

      // Test byMonth aggregation
      expect(stats.byMonth).toBeDefined();
      expect(typeof stats.byMonth).toBe('object');

      // Test specific months
      expect(stats.byMonth['December']).toBe(15);
      expect(stats.byMonth['January']).toBe(1);
    });

    it('should have matching totals', () => {
      const stats = service.getStats();
      const statusSum = stats.pending + stats.accepted + stats.rejected;

      // Sum of status counts should equal total
      expect(statusSum).toBe(stats.total);

      // Sum of monthly counts should equal total
      const monthlySum = Object.values(stats.byMonth).reduce(
        (a: number, b: number) => a + b,
        0,
      );
      expect(monthlySum).toBe(stats.total);
    });
  });
});
