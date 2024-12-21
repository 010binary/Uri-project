import { Controller, Get } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // GET /application
  @Get()
  getAllApplications() {
    return { applications: this.applicationsService.getAllApplications() };
  }
  // GET /application/stats
  @Get('stats')
  getStats() {
    return { stats: this.applicationsService.getStats() };
  }
}
