import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationsService {
  private applications = [
    {
      id: 1,
      jobTitle: 'Software Engineer',
      companyName: 'Tech Solutions',
      status: 'Pending',
      dateApplied: '2024-12-01',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      companyName: 'InnovateX',
      status: 'Accepted',
      dateApplied: '2024-12-03',
    },
    {
      id: 3,
      jobTitle: 'Data Analyst',
      companyName: 'DataCorp',
      status: 'Rejected',
      dateApplied: '2024-12-05',
    },
    {
      id: 4,
      jobTitle: 'UI/UX Designer',
      companyName: 'Creative Minds',
      status: 'Pending',
      dateApplied: '2024-12-07',
    },
    {
      id: 5,
      jobTitle: 'Marketing Specialist',
      companyName: 'BrandWave',
      status: 'Accepted',
      dateApplied: '2024-12-09',
    },
    {
      id: 6,
      jobTitle: 'Web Developer',
      companyName: 'WebWorks',
      status: 'Rejected',
      dateApplied: '2024-12-11',
    },
    {
      id: 7,
      jobTitle: 'HR Manager',
      companyName: 'PeopleFirst',
      status: 'Pending',
      dateApplied: '2024-12-13',
    },
    {
      id: 8,
      jobTitle: 'Sales Executive',
      companyName: 'SalesPro',
      status: 'Accepted',
      dateApplied: '2024-12-15',
    },
    {
      id: 9,
      jobTitle: 'Graphic Designer',
      companyName: 'Artistry Co.',
      status: 'Rejected',
      dateApplied: '2024-12-17',
    },
    {
      id: 10,
      jobTitle: 'Operations Manager',
      companyName: 'Logistics Ltd.',
      status: 'Pending',
      dateApplied: '2024-12-19',
    },
    {
      id: 11,
      jobTitle: 'Business Analyst',
      companyName: 'Analytica Inc.',
      status: 'Accepted',
      dateApplied: '2024-12-21',
    },
    {
      id: 12,
      jobTitle: 'Software Developer',
      companyName: 'CodeCraft',
      status: 'Rejected',
      dateApplied: '2024-12-23',
    },
    {
      id: 13,
      jobTitle: 'Data Scientist',
      companyName: 'DataHub',
      status: 'Pending',
      dateApplied: '2024-12-25',
    },
    {
      id: 14,
      jobTitle: 'Product Designer',
      companyName: 'DesignFlow',
      status: 'Accepted',
      dateApplied: '2024-12-27',
    },
    {
      id: 15,
      jobTitle: 'Marketing Coordinator',
      companyName: 'MarketWise',
      status: 'Rejected',
      dateApplied: '2024-12-29',
    },
    {
      id: 16,
      jobTitle: 'Sales Manager',
      companyName: 'SalesForce',
      status: 'Pending',
      dateApplied: '2025-01-01',
    },
  ];

  getAllApplications() {
    return this.applications;
  }

  getStats() {
    const stats = {
      total: this.applications.length,
      pending: this.applications.filter((app) => app.status === 'Pending')
        .length,
      accepted: this.applications.filter((app) => app.status === 'Accepted')
        .length,
      rejected: this.applications.filter((app) => app.status === 'Rejected')
        .length,
      byMonth: this.applications.reduce((acc, app) => {
        const month = new Date(app.dateApplied).toLocaleString('default', {
          month: 'long',
        });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {}),
    };
    return stats;
  }
}
