import { TestBed } from '@angular/core/testing';

import { RcaProjectChartService } from './rca-project-chart.service';

describe('RcaProjectChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RcaProjectChartService = TestBed.get(RcaProjectChartService);
    expect(service).toBeTruthy();
  });
});
