import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let links: NodeListOf<Element>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    links = document.querySelectorAll('.sidebar-nav .nav-link');
  });

  it('should add the active class to a link when it is clicked', () => {
    const link = links[0] as HTMLElement;
    link.click();
    expect(link.classList.contains('active')).toBe(true);
  });

  it('should remove the active class from other links when a link is clicked', () => {
    const link1 = links[0] as HTMLElement;
    const link2 = links[1] as HTMLElement;
    link1.click();
    expect(link1.classList.contains('active')).toBe(true);
    expect(link2.classList.contains('active')).toBe(false);
    link2.click();
    expect(link1.classList.contains('active')).toBe(false);
    expect(link2.classList.contains('active')).toBe(true);
  });
});
