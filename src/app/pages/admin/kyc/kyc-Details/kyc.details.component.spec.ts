import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCDetailsComponent } from './kyc.details.component';

describe('UsersProfileComponent', () => {
  let component: KYCDetailsComponent;
  let fixture: ComponentFixture<KYCDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KYCDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KYCDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
