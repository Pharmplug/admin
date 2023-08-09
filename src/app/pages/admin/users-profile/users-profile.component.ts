import { Component, OnInit } from '@angular/core';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
  providers: [StoreComponent]
})
export class UsersProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
