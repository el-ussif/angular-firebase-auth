import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrariesListingComponent } from './libraries-listing.component';

describe('LibrariesListingComponent', () => {
  let component: LibrariesListingComponent;
  let fixture: ComponentFixture<LibrariesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrariesListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrariesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
