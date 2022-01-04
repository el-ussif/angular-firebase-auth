import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListingComponent } from './tags-listing.component';

describe('TagsListingComponent', () => {
  let component: TagsListingComponent;
  let fixture: ComponentFixture<TagsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
