import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, JsonpClientBackend } from "@angular/common/http";

import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src/app/pages/auth/auth-utils/authUtils';
import { Observable, Subscription, forkJoin, map } from 'rxjs';
import { UserService } from 'src/app/pages/admin/customers/customers.service';
import Customer from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Recipient from 'src/app/models/request.model';
import { SseService } from './request.sse';
import { SharedService } from 'src/app/shared/shared_service';


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
  request!: Recipient;
  messages: string[] = [];
  message: string = '';

  constructor(@Inject(DOCUMENT) private document: Document, private onSharedService: SharedService, private toastr: ToastrService, private router: Router, private sseService: SseService) { }

  ngOnInit() {

    const currentUser = JSON.parse(localStorage.getItem('user')!);

    this.admin = currentUser.email
    this.role = currentUser.role
    console.log(this.role)




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
