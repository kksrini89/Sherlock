import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudFinderComponent } from './fraud-finder.component';

describe('FraudFinderComponent', () => {
  let component: FraudFinderComponent;
  let fixture: ComponentFixture<FraudFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraudFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
