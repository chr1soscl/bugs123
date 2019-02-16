import { TestBed } from '@angular/core/testing';

import { PhaseChartService } from './phase-chart.service';

describe('PhaseChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhaseChartService = TestBed.get(PhaseChartService);
    expect(service).toBeTruthy();
  });
});
