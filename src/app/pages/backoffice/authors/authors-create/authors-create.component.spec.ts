import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsCreateComponent } from 'src/app/pages/backoffice/authors/authors-create/authors-create.component';

describe('CreateComponent', () => {
  let component: AuthorsCreateComponent;
  let fixture: ComponentFixture<AuthorsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
