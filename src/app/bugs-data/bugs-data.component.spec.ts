import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsDataComponent } from './bugs-data.component';

describe('BugsDataComponent', () => {
  let component: BugsDataComponent;
  let fixture: ComponentFixture<BugsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
