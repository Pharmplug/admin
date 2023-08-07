import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Customer from 'src/app/models/user.model';
import { UserService } from '../customers/customers.service';
import { KycService } from './kyc.service';
import Kyc from 'src/app/models/kyc.model';


@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
  providers: [UserService]
})

//TODO
/**
 * This page should show users that were rejected and add option
 * for us to send them a push notification or email for them to 
 * resend their information so that we can go through their verification again
 */
export class KYCComponent implements OnInit {
  allKyc: Customer[] = [];
  filteredKYC: Customer[] = [];
  http!: HttpClient;
  usdo: Number = 0;
  pageSizes: number[] = [5, 15, 30, 50];
  selectedUser: any;
  privateCollection: any;
  pageOfItems?: Array<any>;
  sortColumn: string = 'created_at'; // Default sorting column
  sortDirection: string = 'asc'; // Default sorting direction

  constructor(public router: Router, private userService: UserService) {
   
  }

  ngOnInit(): void {
    this._fetchData();
    
  }



  _fetchData() {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {

      this.allKyc = data;
      this.filteredKYC=data
      console.log(this.allKyc)
      this.filterUsers(true)
    });

  }

  

  filterUsers(type: any) {
    if (type === true) {
      // filter transactions based on their type
      this.filteredKYC = this.allKyc.filter(user => user.kycStatus === "1")

    } if (type === false) {

      // filter transactions based on their type
      this.filteredKYC = this.allKyc.filter(user => user.kycStatus === undefined ||user.kycStatus === null||user.kycStatus === "" ||user.kycStatus === "0")
      // Generate the list of pages to be displayed
      // this.generatePages(this.filterTransactions.length);
    }
    
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }



  showInfo(index: number) {
    //check that the users arrayis not null
    if (this.filteredKYC.length > 0) {
      // get a specific user from the index in the list of users 
      //and pass it  to selected user object
      this.selectedUser = this.filteredKYC[index];
      // Stringify selected user 
      const stringifiedUser = JSON.stringify(this.selectedUser);
      // route to customer details screen and pass stringified user as arguement
      this.router.navigate(['/admin/kyc-details', { userInfo: stringifiedUser }]);
    }
  }

  sortTable(columnName: string) {
    if (this.sortColumn === columnName) {
      // If the same column is clicked again, reverse the sorting direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, set it as the new sorting column
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    }

    // Sort the table data based on the selected column and direction
    this.filteredKYC.sort((a:any, b:any) => {
      let comparison = 0;

      if (a[columnName] > b[columnName]) {
        comparison = 1;
      } else if (a[columnName] < b[columnName]) {
        comparison = -1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

}
