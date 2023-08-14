
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import Transaction from "../../../models/transaction.model"

@Component({
  selector: 'app-pages-outflow',
  templateUrl: './outflow.transaction.component.html',
  styleUrls: ['./outflow.transaction.component.css'],
})
export class OutflowComponent implements OnInit {
  transactions: Transaction[] = [];
  searchTerm = '';
  pageSizes: number[] = [5, 15, 30, 50];
  selectedTransaction: any;
  showTransactionType!: boolean;
  filteredTransactions: Transaction[] = [];
  startIndex: number = 0;
  lastIndex: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  itemsPerPage: number = 15;
  totalItems: number = 0;
  nameHeader: any;
  isLoading = true;
  revenueArray: any = [];
  fxArray: any = [];
  feeArray: any = [];
  amountArray: any = [];
  revenueSum:any;
  feeSum:any;
  amountSum:any
  fxSum:any
  showRecipientData = false;
  showNetAmount = false;
  startDate!: string;
  endDate!: string;
  showCustomFilter = false;
  sortColumn: string = 'created_at'; // Default sorting column
  sortDirection: string = 'asc'; // Default sorting direction

  constructor(
    public router: Router) {
    // initialize the filteredTransactions array with all transactions
    this.filteredTransactions = [];

  }

  ngOnInit(): void {
    this.nameHeader = document.getElementById('name-header');
    //this._fetchData();


  }
//   _fetchData() {

//     this.transactionService.getAll().snapshotChanges().pipe(
//       map(changes =>
//         changes.map(c =>
//           ({ id: c.payload.doc.id, ...c.payload.doc.data() })
//         )
//       )
//     ).subscribe(data => {
//       this.transactions = data;

//       console.log(this.transactions)
//       // Assign the slice of transactions to be displayed in the current page to the filteredTransactions property
//       this.filteredTransactions = this.transactions
//       this.isLoading = false
//       // Generate the list of pages to be displayed
//       this.generatePages(this.transactions.length);
//       this.filterTransactions('Direct Payment');
//     });

//     //console.log(tableData);
//     //this.tableData = tableData;
//   }

//   filterTransactions(type: string) {
//     type === 'Direct Payment'

//     this.showNetAmount = false
//     // filter transactions based on their type
//     this.filteredTransactions = this.transactions.filter(transaction => transaction.transition_type === type).slice(this.startIndex, this.lastIndex);
//     // Generate the list of pages to be displayed
//     this.generatePages(this.transactions);

//     this.filteredTransactions.forEach((transaction) => {
//       const totalAmount = Number(transaction.token_amount);
//       const totalFee = Number(transaction.amount_fee);
//       const totalFx = Number(transaction.fxRateInfo.fxRate);

//       this.amountArray.push(totalAmount)
//       this.feeArray.push(totalFee)
//       this.fxArray.push(totalFx)



//       this.revenueArray.push(totalFee);
//       this.revenueArray.push(totalFx);
//       console.log(this.revenueSum)
//     });

//     this.revenueSum= this.revenueArray.reduce((total: any, revenue: any) => total + revenue, 0);
//     console.log('Total revenue:', this.revenueSum);

//     this.feeSum= this.feeArray.reduce((total: any, revenue: any) => total + revenue, 0);
//     console.log('Total revenue:', this.feeSum);
//     this.fxSum= this.fxArray.reduce((total: any, revenue: any) => total + revenue, 0);
//     console.log('Total revenue:', this.fxSum);
//     this.amountSum= this.amountArray.reduce((total: any, revenue: any) => total + revenue, 0);
//     console.log('Total revenue:', this.amountSum);
//   }

// /**
//  * Filters transactions by a custom date range.
//  */
//  filterTransactionsByCustomDate() {
//   // Convert start and end dates to Date objects
//   const start = new Date(this.startDate);
//   const end = new Date(this.endDate);

//   // Add 1 day to end date to include transactions on the end date
//   end.setDate(end.getDate() + 1);

//   // Filter transactions by date range
//   this.filteredTransactions = this.transactions.filter(
//     transaction =>
//       // Convert transaction created_at to a Date object and compare to start and end dates
//       new Date(transaction.created_at.toMillis()) >= start &&
//       new Date(transaction.created_at.toMillis()) < end
//   );
//   // Generate the list of pages to be displayed
//   this.generatePages(this.filterTransactions.length);
// }


//   searchTransactions() {
//     if (this.searchTerm.trim() !== '') {
//       this.filteredTransactions = this.transactions.filter(
//         (transaction) =>
//           transaction.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           transaction.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           transaction.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           transaction.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           transaction.stellar_address.toLowerCase().includes(this.searchTerm.toLowerCase())
//       );

//     } else {
//       this.filterTransactions('Direct Payment');
//     }
//   }

//   /**
  
//   @description This function filters the transactions by a specified number of days and assigns the filtered transactions to the filteredTransactions property.
//   @param days - The number of days to filter by
//   @returns void
//   */
//   filterTransactionsByDays(days: number) {
//     // Calculate the start date for the filter
//     const today = new Date();
//     const startDate = new Date();
//     startDate.setDate(today.getDate() - days);
//     // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
//     this.filteredTransactions = this.transactions.filter(transaction => new Date(transaction.created_at.toMillis()) >= startDate);
//   }

//   showIndex(index: number) {
//     if (this.filteredTransactions.length > 0) {
//       this.selectedTransaction = this.filteredTransactions[index];
//       const stringifiedTransaction = JSON.stringify(this.selectedTransaction);
//       this.router.navigate(['/admin/user-outflow-transaction', { transactionInfo: stringifiedTransaction }]);
//     }
//   }
 

//   sortTable(columnName: string) {
//     if (this.sortColumn === columnName) {
//       // If the same column is clicked again, reverse the sorting direction
//       this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//     } else {
//       // If a different column is clicked, set it as the new sorting column
//       this.sortColumn = columnName;
//       this.sortDirection = 'asc';
//     }

//     // Sort the table data based on the selected column and direction
//     this.filteredTransactions.sort((a:any, b:any) => {
//       let comparison = 0;

//       if (a[columnName] > b[columnName]) {
//         comparison = 1;
//       } else if (a[columnName] < b[columnName]) {
//         comparison = -1;
//       }

//       return this.sortDirection === 'asc' ? comparison : -comparison;
//     });
//   }



//   /**
 
// This function generates an array of page numbers based on the total number of pages.
// The pages array is set to empty at the beginning of the function.
// It then iterates through each page and pushes the page number to the pages array.
// @param none
// @returns none
// */
//   generatePages(dataList: any) {
//     // Calculate the total number of items and pages
//     this.totalItems = dataList;
//     this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
//     this.pages = [];
//     for (let i = 1; i <= this.totalPages; i++) {
//       this.pages.push(i);
//     }
//   }
//   /**
  
//   This function sets the current page, start index, last index, and filtered transactions based on the input index.
//   @param index - The page index to set as the current page.
//   @returns none
//   */
//   setPage(index: number) {
//     this.currentPage = index;
//     this.startIndex = index * this.itemsPerPage;
//     this.lastIndex = this.startIndex + this.itemsPerPage;
//     this.filteredTransactions = this.transactions.slice(this.startIndex, this.lastIndex);
//   }
//   /**
  
//   This function sets the current page, start index, last index, and filtered transactions for the next page.
//   It first checks if there is a next page by comparing the current page with the total pages.
//   @param none
//   @returns none
//   */
//   nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage += 1;
//       this.startIndex = this.lastIndex;
//       this.lastIndex += this.itemsPerPage;
//       this.filteredTransactions = this.transactions.slice(this.startIndex, this.lastIndex);
//     }
//   }
//   /**
  
//   This function sets the current page, start index, last index, and filtered transactions for the previous page.
//   It first checks if there is a previous page by comparing the current page with 1.
//   @param none
//   @returns none
//   */
//   prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage -= 1;
//       this.lastIndex = this.startIndex;
//       this.startIndex -= this.itemsPerPage;
//       this.filteredTransactions = this.transactions.slice(this.startIndex, this.lastIndex);
//     }
//   }

//   /*
  
//   This function converts a given value to a floating point number and rounds it off to two decimal places.
//   @param value: The value to be converted to a floating point number
//   @return: The floating point number rounded off to two decimal places
//   */
//   convertFloat(value: any): string {
//     return parseFloat(value).toFixed(2);
//   }
//   /*
  
//   This function adds two given values as floating point numbers and rounds off the result to two decimal places.
//   @param a: The first value to be added
//   @param b: The second value to be added
//   @return: The sum of the two values rounded off to two decimal places
//   */
//   addFloat(a: any, b: any): string {
//     const c = parseFloat(a) + parseFloat(b);
//     return c.toFixed(2);
//   }

//   handlePageSizeChange(event: any): void {
//     this.itemsPerPage = event.target.value;
//     this.currentPage = 1;
//     this.generatePages(this.transactions.length)
//   }

}
