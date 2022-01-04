import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesListingComponent } from './languages-listing.component';

describe('LanguagesListingComponent', () => {
  let component: LanguagesListingComponent;
  let fixture: ComponentFixture<LanguagesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
