import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersLayoutComponent } from './customers-layout.component';

describe('CustomersLayoutComponent', () => {
  let component: CustomersLayoutComponent;
  let fixture: ComponentFixture<CustomersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
