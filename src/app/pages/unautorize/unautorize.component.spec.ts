import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnautorizeComponent } from './unautorize.component';

describe('UnautorizeComponent', () => {
  let component: UnautorizeComponent;
  let fixture: ComponentFixture<UnautorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnautorizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnautorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
