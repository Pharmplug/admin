import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOutflowComponent } from './user.outflow.transaction.component';

describe('UserTransactionComponent', () => {
  let component: UserOutflowComponent;
  let fixture: ComponentFixture<UserOutflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOutflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOutflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
