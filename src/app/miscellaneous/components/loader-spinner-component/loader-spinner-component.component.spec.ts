import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSpinnerComponentComponent } from './loader-spinner-component.component';

describe('LoaderSpinnerComponentComponent', () => {
  let component: LoaderSpinnerComponentComponent;
  let fixture: ComponentFixture<LoaderSpinnerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderSpinnerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderSpinnerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
