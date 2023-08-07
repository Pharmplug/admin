import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MtlComponent } from './mtl.component';

describe('SettingsComponent', () => {
  let component: MtlComponent;
  let fixture: ComponentFixture<MtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
