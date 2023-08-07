import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from './customers.service';
import { map } from 'rxjs';
import Customer from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Pager } from 'src/app/models/pagination.model';
import { Dialog } from '@angular/cdk/dialog';
import { CustomersReportDialog } from './report/report.customers';

@Component({
  selector: '.app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [UserService]
})
export class CustomersComponent implements OnInit {
  order: readonly string[] = [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;

  items: Customer[] = [];
  initialPage = 1;
  pageSize: any;
  maxPages: any;



  startDate: any
  endDate: any

  searchTerm!: ''

  constructor(public dialog: Dialog,private userService: UserService, public router: Router) { }

  ngOnInit() {

    this._fetchData();

  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


  _fetchData() {
    this.userService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map((users: any[]) =>
        users.filter((user: any) => user.kycStatus
        === '1' )
      )
    ).subscribe(data => {
      // data now contains only the users where idVerified is true
      console.log(data);
      this.items = data;
    });
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.pageOfItems = [...this.pageOfItems!.sort((a: any, b: any) => {
      // sort comparison function
      let result = 0;
      if (a[property] < b[property]) {
        result = -1;
      }
      if (a[property] > b[property]) {
        result = 1;
      }
      return result * this.sortOrder;
    })];
  }

  sortIcon(property: string) {
    if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '☝️' : '👇';
    }
    return '';
  }



  showInfo(index: number) {
    //check that the users arrayis not null
    if (this.items.length > 0) {
      // get a specific user from the index in the list of users 
      //and pass it  to selected user object
      let selectedUser = this.items[index];
      // Stringify selected user 
      const stringifiedUser = JSON.stringify(selectedUser);
      // route to customer details screen and pass stringified user as arguement
      this.router.navigate(['/admin/customer-details', { userInfo: stringifiedUser }]);
    }
  }


  filterTransactionsByDays(days: number) {
    // Calculate the start date for the filter
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);

    console.log(startDate)
    // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
    this.pageOfItems! = this.items.filter(user => new Date(user.registration_date.toMillis()) >= startDate);


  }
  handleDateChange(type:any,dateString: any) {
    const date = new Date(dateString.target.value);
    const milliseconds = date.getTime();
  
    console.log(milliseconds);
  }
  
  filterTransactionsByCustomDate() {
    console.log(this.startDate)
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    end.setDate(end.getDate() + 1); // add 1 day to include transactions on the end date
    this.pageOfItems!=this.items.filter(
      user =>
        new Date(user.registration_date.toISOString().split('T')[0]) >= this.startDate.toDate() &&
        new Date(user.registration_date.toISOString().split('T')[0]) < this.endDate.toDate()
    );
    console.log(this.pageOfItems![0].registration_date.toISOString().split('T')[0]);
  }


  searchUsers() {
    if (this.searchTerm.trim() != '') {
      const mitems = this.items!.filter((user) =>
        (user.email && user.email.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.phone && user.phone.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.stellar_address && user.stellar_address.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.firstName && user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
     this.pageOfItems=mitems
    } else {
      // Reset the items array when the search term is empty
    this.pageOfItems;
    }
  }
  
  
  openDialog() {

    this.dialog.open(CustomersReportDialog, {
      minWidth: '600px',
      
    });
  }



}




