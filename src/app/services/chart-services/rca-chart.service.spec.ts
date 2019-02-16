import { TestBed } from '@angular/core/testing';

import { RcaChartService } from './rca-chart.service';

describe('RcaChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RcaChartService = TestBed.get(RcaChartService);
    expect(service).toBeTruthy();
  });
});
