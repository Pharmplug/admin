import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DOCUMENT } from '@angular/common';
import { Component, DebugElement, Inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/pages/auth/auth-utils/authUtils';
import { HeaderComponent } from './header.component';
import { HttpClient } from '@angular/common/http';

// Mock AuthService
class MockAuthService {
  getData() {
    return 'admin';
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let http!: HttpClient;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: DOCUMENT, useValue: document }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    document = TestBed.inject(DOCUMENT);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    const body = document.body;
    const button: DebugElement = fixture.debugElement.query(By.css('.sidebar-toggle'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(body.classList).toContain('toggle-sidebar');
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(body.classList).not.toContain('toggle-sidebar');
  });

  it('should fetch balance and admin data', () => {
    spyOn(authService, 'getData').and.returnValue('admin');
    spyOn(http, 'get').and.returnValue(of({balances: [{balance: 100.00}]}));
    component.getBal();
    expect(component.usdo).toBe('100.00');
    expect(component.admin).toBe('admin');
    const url = environment.horizonUrl + '/accounts/' + environment.assetInfo.distributor;
    expect(http.get).toHaveBeenCalledWith(url);
  });
});
