import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutflowComponent } from './outflow.transaction.component';

describe('OutflowComponent', () => {
  let component: OutflowComponent;
  let fixture: ComponentFixture<OutflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
