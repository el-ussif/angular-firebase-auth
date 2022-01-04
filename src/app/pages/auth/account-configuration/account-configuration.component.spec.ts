import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConfigurationComponent } from './account-configuration.component';

describe('AccountConfigurationComponent', () => {
  let component: AccountConfigurationComponent;
  let fixture: ComponentFixture<AccountConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
