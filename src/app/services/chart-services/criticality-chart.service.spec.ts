import { TestBed } from '@angular/core/testing';

import { CriticalityChartService } from './criticality-chart.service';

describe('CriticalityChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CriticalityChartService = TestBed.get(CriticalityChartService);
    expect(service).toBeTruthy();
  });
});
