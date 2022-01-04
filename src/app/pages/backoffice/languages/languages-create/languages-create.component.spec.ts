import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesCreateComponent } from './languages-create.component';

describe('LanguagesCreateComponent', () => {
  let component: LanguagesCreateComponent;
  let fixture: ComponentFixture<LanguagesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
