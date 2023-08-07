import { Component, OnInit } from '@angular/core';
import { TransactionComponent } from '../transactions/transaction.component';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
  providers: [TransactionComponent]
})
export class UsersProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
