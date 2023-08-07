import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class RegisterComponent implements OnInit {
  year: number = new Date().getFullYear();
  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }
  register =  () => {
    this.router.navigate(['/admin']);
}
}
