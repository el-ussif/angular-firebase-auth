import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsCreateComponent } from './collections-create.component';

describe('CollectionsCreateComponent', () => {
  let component: CollectionsCreateComponent;
  let fixture: ComponentFixture<CollectionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
