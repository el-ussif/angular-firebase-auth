import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsUpdateComponent } from './collections-update.component';

describe('CollectionsUpdateComponent', () => {
  let component: CollectionsUpdateComponent;
  let fixture: ComponentFixture<CollectionsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
