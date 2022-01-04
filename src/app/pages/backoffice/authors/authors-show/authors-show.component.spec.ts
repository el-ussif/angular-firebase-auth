import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsShowComponent } from './authors-show.component';

describe('AuthorsShowComponent', () => {
  let component: AuthorsShowComponent;
  let fixture: ComponentFixture<AuthorsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
