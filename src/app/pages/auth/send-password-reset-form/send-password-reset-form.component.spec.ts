import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordResetFormComponent } from './send-password-reset-form.component';

describe('SendPasswordResetFormComponent', () => {
  let component: SendPasswordResetFormComponent;
  let fixture: ComponentFixture<SendPasswordResetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPasswordResetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPasswordResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
