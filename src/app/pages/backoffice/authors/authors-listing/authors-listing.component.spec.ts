import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsListingComponent } from 'src/app/pages/backoffice/authors/authors-listing/authors-listing.component';

describe('ListingComponent', () => {
  let component: AuthorsListingComponent;
  let fixture: ComponentFixture<AuthorsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
