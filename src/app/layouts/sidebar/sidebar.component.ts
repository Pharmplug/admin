import { NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
show:boolean=false
showSuper:boolean=false
userRole:any
  constructor() { }

  ngOnInit(): void {
    this.userRole = JSON.parse(localStorage.getItem('role')!);

    if (this.userRole === "Operations") {
      this.show = false;
    } else if (this.userRole === "Admin" || this.userRole === "Super Admin") {
      this.show = true;
    }

    if (this.userRole === "Super Admin") {
      this.showSuper = true;
    }
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
  

  filterRole(){

 
    
  }

}
