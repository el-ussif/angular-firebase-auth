import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsListingComponent } from './contracts-listing.component';

describe('ContractsListingComponent', () => {
  let component: ContractsListingComponent;
  let fixture: ComponentFixture<ContractsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
