import { TestBed } from '@angular/core/testing';

import { ProjectRcaChartService } from './project-rca-chart.service';

describe('ProjectRcaChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectRcaChartService = TestBed.get(ProjectRcaChartService);
    expect(service).toBeTruthy();
  });
});
