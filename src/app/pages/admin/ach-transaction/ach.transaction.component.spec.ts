import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACHTransactionComponent } from './ach.transaction.component';

describe('TransactionComponent', () => {
  let component:ACHTransactionComponent;
  let fixture: ComponentFixture<ACHTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ACHTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ACHTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
