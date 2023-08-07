import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserACHTransactionComponent } from './user.ach.transaction.component';

describe('UserTransactionComponent', () => {
  let component: UserACHTransactionComponent;
  let fixture: ComponentFixture<UserACHTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserACHTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserACHTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
