import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersLayoutComponent } from './providers-layout.component';

describe('ProvidersLayoutComponent', () => {
  let component: ProvidersLayoutComponent;
  let fixture: ComponentFixture<ProvidersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
