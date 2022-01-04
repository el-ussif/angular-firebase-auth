import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsShowComponent } from './collections-show.component';

describe('CollectionsShowComponent', () => {
  let component: CollectionsShowComponent;
  let fixture: ComponentFixture<CollectionsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
