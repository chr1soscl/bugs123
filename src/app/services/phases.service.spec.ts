import { TestBed } from '@angular/core/testing';

import { PhasesService } from './phases.service';

describe('PhasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhasesService = TestBed.get(PhasesService);
    expect(service).toBeTruthy();
  });
});
