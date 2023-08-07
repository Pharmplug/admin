import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const firstLink = navLinks[0] as HTMLElement; // get the first nav link as HTMLElement
  
    firstLink.classList.add('active'); // add active class to first nav link by default
  
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(otherLink => {
          otherLink.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  }
  

}
