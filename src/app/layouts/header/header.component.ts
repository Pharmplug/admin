import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from "@angular/common/http";

import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/pages/auth/auth-utils/authUtils';
import { AchService } from 'src/app/pages/admin/request/requests.service';
import { TransactionService } from 'src/app/pages/admin/store/transaction.service';
import { Observable, forkJoin, map } from 'rxjs';
import { UserService } from 'src/app/pages/admin/customers/customers.service';
import Customer from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usdo!: string;
  admin!: String;
  username!: String;
  role!: string;
  transactionsCount: any
  achTransactionsCount: any
  currentRole!: string
  usersCount!: Number
  notificationCount!: String;
  http!: HttpClient;
  authService!: AuthService;
  totalLength: any
  constructor(@Inject(DOCUMENT) private document: Document, private ach: AchService, private transactionService: TransactionService, private userService: UserService, private router: Router) { }

  ngOnInit() {
localStorage.clear()
    const currentUser = JSON.parse(localStorage.getItem('user')!);

    this.admin = currentUser.email
    this.role = currentUser.role
    this.username = currentUser.email.split("@")[0];
    if (this.role === "0") {
      this.role = "Admin"
    } else if (this.role === "1") {
      this.role = "Marketing"
    } else if (this.role === "2") {
      this.role = "Operations"
    } else if (this.role === "3") {
      this.role = "Super Admin"
    }



 

    this.getTotalDataCount();

  }


  // Function to toggle sidebar
  sidebarToggle() {
    // Toggle the 'toggle-sidebar' class of the body element to show/hide sidebar
    this.document.body.classList.toggle('toggle-sidebar');
  }

  // Function to logout user
  logout() {
    // Clear session information from local storage
    localStorage.clear()!
    this.router.navigate(['/login']);
  }


  _fetchAch() {
    this.ach.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      localStorage.setItem('achLength', data.length.toString());
    })
  }

  _fetchTransactions() {
    this.transactionService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      localStorage.setItem('transactionLength', data.length.toString());
    });
  }

  _fetchData() {
    this.userService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      localStorage.setItem('allUsersLength', data.length.toString());
    });
  }



  // After all data is fetched, the total length will be stored in the totalLength variable



  getTotalDataCount() {
    this._fetchAch();
    this._fetchTransactions();
    this._fetchTransactions();
    this.usersCount = Number.parseInt(localStorage.getItem('allUsersLength')!)
    this.transactionsCount = Number.parseInt(localStorage.getItem('transactionLength')!)
    this.achTransactionsCount = Number.parseInt(localStorage.getItem('achLength')!)
    this.totalLength = this.usersCount + this.transactionsCount + this.achTransactionsCount
    console.log("Total length of all data:", this.totalLength);
    return this.notificationCount = this.totalLength.toString()
  }


  clearNotifications() {
    localStorage.removeItem('allUsersLength');
    localStorage.removeItem('achLength');
    localStorage.removeItem('transactionLength');
  }

}
