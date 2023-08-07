import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AchService } from './ach.transaction.service';
import Ach from 'src/app/models/ach.model';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-pages-transactions',
  templateUrl: './ach.transaction.component.html',
  styleUrls: ['./ach.transaction.component.css']
})
export class ACHTransactionComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource:Ach[] = [];
  transactions: Ach[] = [];
  searchTerm = '';
  pageSizes: number[] = [10, 15, 30, 50];
  selectedTransaction: any;
  showTransactionType!: boolean;
  selectedUser: any;
  filteredTransactions: Ach[] = [];
  startIndex: number = 0;
  lastIndex: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  itemsPerPage!: number;
  totalItems: number = 0;
  nameHeader: any;
  headerType!:string;
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
  filteredType: Ach[] = [];
  startDate!: string;
  endDate!: string;
  showCustomFilter = false;
  pageOfItems?: Array<any>;
  sortColumn: string = 'created_at'; // Default sorting column
  sortDirection: string = 'asc'; // Default sorting direction

  requestUpdate: any[] = [
    {
      created_at: new Date(2023, 7, 1, 10, 30, 0), // Replace with the actual date and time
      firstName: "John",
      lastName: "Doe",
      drug: "Drug A",
      location: "Location A",
      delivery_type: "Walk in",
      amount_net: 100.5,
      status: "Pending",
    },
    {
      created_at: new Date(2023, 7, 2, 12, 45, 0), // Replace with the actual date and time
      firstName: "Jane",
      lastName: "Smith",
      drug: "Drug B",
      location: "Location B",
      delivery_type: "Rider",
      amount_net: 50.75,
      status: "Completed",
    },   {
      created_at: new Date(2023, 7, 2, 12, 45, 0), // Replace with the actual date and time
      firstName: "Jane",
      lastName: "Smith",
      drug: "Drug B",
      location: "Location B",
      delivery_type: "Rider",
      amount_net: 50.75,
      status: "Completed",
    },   {
      created_at: new Date(2023, 7, 2, 12, 45, 0), // Replace with the actual date and time
      firstName: "Jane",
      lastName: "Smith",
      drug: "Drug B",
      location: "Location B",
      delivery_type: "Rider",
      amount_net: 50.75,
      status: "Completed",
    },   {
      created_at: new Date(2023, 7, 2, 12, 45, 0), // Replace with the actual date and time
      firstName: "Jane",
      lastName: "Smith",
      drug: "Drug B",
      location: "Location B",
      delivery_type: "Rider",
      amount_net: 50.75,
      status: "Completed",
    },
    // Add more dummy data items here...
  ];
  constructor( private ach: AchService,
    public router: Router) {
   
    
  }

  ngOnInit() {
    this.fetchAch();
    this._filterTransactions('All');
    this.filteredTransactions;
    this.itemsPerPage=10;
  }


  fetchAch() {
    this.ach.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.transactions = data;
      this.isLoading = false
      this._filterTransactions('All');
      this.dataSource =data
      console.log(this.transactions)
    })
  }

  _filterTransactions(type: string) {
    if (type === 'All') {
      this.headerType='All'
   
      this.filteredType = this.transactions
      this.getAllSums(this.filteredType)

    } if (type === 'deposit') {
      this.headerType='deposit'
     
      this.filteredType = this.transactions.filter(transaction => transaction.transition_type === type)
      this.getAllSums(this.filteredType)


    } if (type === 'withdraw') {
      this.headerType='withdraw'
  
    
      this.filteredType = this.transactions.filter(transaction => transaction.transition_type === type)
      this.getAllSums(this.filteredType)
    }
  }

/**
 * Filters transactions by a custom date range.
 */
 filterTransactionsByCustomDate() {
  // Convert start and end dates to Date objects
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);

  // Add 1 day to end date to include transactions on the end date
  end.setDate(end.getDate() + 1);

  // Filter transactions by date range
  this.filteredType= this.transactions.filter(
    transaction =>
      // Convert transaction created_at to a Date object and compare to start and end dates
      new Date(transaction.created_at.toMillis()) >= start &&
      new Date(transaction.created_at.toMillis()) < end
  );

  this.getAllSums(this.filteredTransactions)
}


  searchTransactions() {
    if (this.searchTerm.trim() !== '') {
      const mitems = this.filteredType!.filter((user) =>
        (user.email && user.email.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.phone && user.phone.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.stellar_address && user.stellar_address.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.firstName && user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
     this.pageOfItems=mitems
    } else {
      // Reset the items array when the search term is empty
    this.pageOfItems;
    }
  }

  

  /**
  
  @description This function filters the transactions by a specified number of days and assigns the filtered transactions to the filteredTransactions property.
  @param days - The number of days to filter by
  @returns void
  */
  filterTransactionsByDays(days: number) {
    // Calculate the start date for the filter
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);
    // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
    this.filteredType = this.transactions.filter(transaction => new Date(transaction.created_at.toMillis()) >= startDate);
  }


  showIndex(index: number) {
    if (this.transactions.length > 0) {
      this.selectedTransaction = this.transactions[index];
      const stringifiedTransaction = JSON.stringify(this.selectedTransaction);
      this.router.navigate(['/admin/user-achTransactions', { transactionInfo: stringifiedTransaction }]);
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
    this.filteredTransactions.sort((a:any, b:any) => {
      let comparison = 0;

      if (a[columnName] > b[columnName]) {
        comparison = 1;
      } else if (a[columnName] < b[columnName]) {
        comparison = -1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  /*
  
  This function converts a given value to a floating point number and rounds it off to two decimal places.
  @param value: The value to be converted to a floating point number
  @return: The floating point number rounded off to two decimal places
  */
  convertFloat(value: any): string {
    return parseFloat(value).toFixed(2);
  }
  /*
  
  This function adds two given values as floating point numbers and rounds off the result to two decimal places.
  @param a: The first value to be added
  @param b: The second value to be added
  @return: The sum of the two values rounded off to two decimal places
  */
  addFloat(a: any, b: any): string {
    const c = parseFloat(a) + parseFloat(b);
    return c.toFixed(2);
  }

  getAllSums(data: any) {
    this.amountArray = [];
    this.feeArray = [];
    this.revenueArray = [];
    this.fxArray = [];

    data.forEach((transaction: any) => {
      const totalAmount = Number(transaction.token_amount);
      const totalFee = Number(transaction.amount_fee);
      // const totalFx = Number(transaction.fxRateInfo.fxRate);

      this.amountArray.push(totalAmount)
      this.feeArray.push(totalFee)
      // this.fxArray.push(totalFx)


      this.revenueArray.push(totalFee);
      // this.revenueArray.push(totalFx);
      console.log(this.revenueSum)
    });

    this.revenueSum = this.revenueArray.reduce((total: any, revenue: any) => total + revenue, 0);
    console.log('Total revenue:', this.revenueSum);

    this.feeSum = this.feeArray.reduce((total: any, revenue: any) => total + revenue, 0);
    console.log('Total revenue:', this.feeSum);
    this.fxSum = this.fxArray.reduce((total: any, revenue: any) => total + revenue, 0);
    console.log('Total revenue:', this.fxSum);
    this.amountSum = this.amountArray.reduce((total: any, revenue: any) => total + revenue, 0);
    console.log('Total revenue:', this.amountSum);
  }

  // handlePageSizeChange(event: any): void {
  //   this.itemsPerPage = event.target.value;
  //   this.currentPage = 1;
  //   this.generatePages(this.filteredTransactions.length)
  // }
  
  


  

}
