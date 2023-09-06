import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Recipient from 'src/app/models/request.model';
import { RequestService } from './request.service';


@Component({
  selector: 'app-pages-transactions',
  templateUrl: './requests.component.html',

})
export class RequestComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  searchTerm = '';
  pageSizes: number[] = [10, 15, 30, 50];
  selectedRequest: any;
  showTransactionType!: boolean;
  selectedUser: any;
  filteredRequest: Recipient[] = [];
  startIndex: number = 0;
  lastIndex: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  itemsPerPage!: number;
  totalItems: number = 0;
  nameHeader: any;
  headerType!: string;
  isLoading = true;
  showRecipientData = false;
  showNetAmount = false;
  revenueArray: any = [];
  fxArray: any = [];
  feeArray: any = [];
  amountArray: any = [];
  revenueSum: any;
  feeSum: any;
  amountSum: any
  fxSum: any
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  startDate!: string;
  endDate!: string;
  showCustomFilter = false;
  pageOfItems?: Array<any>;
  sortColumn: string = 'created_at'; // Default sorting column
  sortDirection: string = 'asc'; // Default sorting direction
  requestUpdate: Recipient[] = [];
  private subscription!: Subscription;
  messages: string[] = [];
  constructor(
    public router: Router, public http: HttpClient, private requestService: RequestService) {


  }

  ngOnInit() {
    this._fetchData()

    this.requestUpdate;

    this._filterRequest('all');

  }



  async _fetchData() {

    var value = await this.requestService.getAll()
    console.log(value)
    this.requestUpdate = value['data']
    this.filteredRequest = value['data']

  }






  _filterRequest(type: string) {
    this.filteredRequest = [];
    if (type === 'all') {
      this.filteredRequest = [];
      console.log(type);
      this.filteredRequest = this.requestUpdate;
    } else if (type === 'pending' || type === 'new') {
      console.log(type);
      this.filteredRequest = this.requestUpdate.filter(request =>
        request.status.toLowerCase() === 'new' || request.status.toLowerCase() === 'pending'
      );
    } else if (type === 'ready') {
      console.log(type);
      this.filteredRequest = this.requestUpdate.filter(request =>
        request.status.toLowerCase() === type
      );
    } else if (type === 'delivered') {
      console.log(type);
      this.filteredRequest = this.requestUpdate.filter(request =>
        request.status.toLowerCase() === type
      );
    }
  }

  /**
   * Filters transactions by a custom date range.
   */
  filterTransactionsByCustomDate() {


  }


  searchTransactions() {

  }



  /**
  
  @description This function filters the transactions by a specified number of days and assigns the filtered transactions to the filteredTransactions property.
  @param days - The number of days to filter by
  @returns void
  */
  filterTransactionsByDays(days: number) {
  }




  showRequest(requestData:any) {
  
  
    // Stringify selected user 
    const stringifiedRequest = JSON.stringify(requestData);
    // route to customer details screen and pass stringified user as arguement
    this.router.navigate(['/admin/edit-request', { requestInfo: stringifiedRequest }]);
  
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

  }
getcartCount(cartItem:any){
 var data= JSON.parse(cartItem);
 return data.length
}

  onTableDataChange(event: any) {
    //this.filteredDrugsList= []
    this.page = event;
   // this._fetchData()
   this.filteredRequest
  }

  onTableSizeChange(event: any) {
    this.tableSize = event?.target.value;
    this.page = 1;
   // this._fetchData()
   this.filteredRequest
  }
}
