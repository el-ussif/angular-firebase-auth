import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminsLayoutComponent } from './super-admins-layout.component';

describe('SuperAdminsLayoutComponent', () => {
  let component: SuperAdminsLayoutComponent;
  let fixture: ComponentFixture<SuperAdminsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
