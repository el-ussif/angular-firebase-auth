import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrariesShowComponent } from './libraries-show.component';

describe('LibrariesShowComponent', () => {
  let component: LibrariesShowComponent;
  let fixture: ComponentFixture<LibrariesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrariesShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrariesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
