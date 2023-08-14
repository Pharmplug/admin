import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from "@angular/common/http";

import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src/app/pages/auth/auth-utils/authUtils';
import { Observable, Subscription, forkJoin, map } from 'rxjs';
import { UserService } from 'src/app/pages/admin/customers/customers.service';
import Customer from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/pages/admin/dashboard/dashboard.service';
import Recipient from 'src/app/models/request.model';

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
  requestUpdate: Recipient[] = [];
   private subscription!: Subscription;
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) { }

  ngOnInit() {
  // this. _fetchRealTimeRequest()
//localStorage.clear()
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




  }

  // ngOnDestroy() {
  //   this.dashboardService.disconnect();
  //   this.subscription.unsubscribe();
  // }

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


 


  // _fetchRealTimeRequest() {
  //   this.subscription = this.dashboardService.connect().subscribe(
  //     (event: MessageEvent) => {
  //       const data2obj = JSON.parse(event.data.trim());
  
  //       if (data2obj['request']['ref'] === null || data2obj['request']['ref'] === undefined || data2obj['request']['ref'] === 0) {
  //         // Do nothing if the incoming request's 'ref' is null, undefined, or 0
  //       } else {
  //         // Check if a request with the same 'ref' value already exists in the array
  //         const existingRequest = this.requestUpdate.find(item => item.ref === data2obj['request']['ref']);
          
  //         if (!existingRequest) {
  //           // If no existing request with the same 'ref' value, push the new request to the array
  //           this.requestUpdate.push(data2obj['request']);
  //           console.log(data2obj['request']);
  //         }
  //       }
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

  clearNotifications() {
    localStorage.removeItem('allUsersLength');
    localStorage.removeItem('achLength');
    localStorage.removeItem('transactionLength');
  }

}
