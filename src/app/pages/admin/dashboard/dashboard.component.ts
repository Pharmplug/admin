import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AchService } from '../ach-transaction/ach.transaction.service';
import Ach from 'src/app/models/ach.model';
import { TransactionService } from '../transactions/transaction.service';
import Transaction from '../../../models/transaction.model';

import * as echarts from 'echarts';
import { UserService } from '../customers/customers.service';
import Customer from 'src/app/models/user.model';
import { Router } from '@angular/router';


interface UserTransaction {
  firstName: any;
  lastName: any;
  deposit: any;
  withdraw: any;
}

interface UserTransactionWithAverage extends UserTransaction {
  average: any;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  users_count!: Number;
  achData: any
  total_deposit: any = 0;
  total_withdrawal: any = 0;
  kyc_count: number = 0;
  kyc: any
  totalWithdraw!: any
  totalDeposit!: any
  paymentUpdate: Transaction[] = [];
  searchTerm = '';
  selectedTransaction: any;
  showTransactionType!: boolean;
  selectedUser: any;
  period: string = 'All'
  periodW: string = 'All'
  periodD: string = 'All'
  topTransactions!: any
  allUsers!: Customer[]
  users!: Customer[]
  sortColumn: string = 'created_at'; // Default sorting column
  sortDirection: string = 'asc'; // Default sorting direction

  constructor(private router: Router, private userService: UserService, private elementRef: ElementRef, private db: AngularFirestore, private ach: AchService, private transactionService: TransactionService) { }
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
      status: "Pending",
    },   {
      created_at: new Date(2023, 7, 2, 12, 45, 0), // Replace with the actual date and time
      firstName: "Jane",
      lastName: "Smith",
      drug: "Drug B",
      location: "Location B",
      delivery_type: "Rider",
      amount_net: 50.75,
      status: "Pending",
    },   {
      created_at: new Date(2023, 7, 2, 12, 45, 0), // Replace with the actual date and time
      firstName: "Jane",
      lastName: "Smith",
      drug: "Drug B",
      location: "Location B",
      delivery_type: "Rider",
      amount_net: 50.75,
      status: "Pending",
    },   {
      created_at: new Date(2023, 7, 2, 12, 45, 0), // Replace with the actual date and time
      firstName: "Jane",
      lastName: "Smith",
      drug: "Drug B",
      location: "Location B",
      delivery_type: "Rider",
      amount_net: 50.75,
      status: "Pending",
    },
    // Add more dummy data items here...
  ];
  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.fetchAch()
    this._fetchAllTransactions()
    this._fetchUsersData()
    this.switchToDay('all');
    this.paymentUpdate
  var mm=  localStorage.getItem('user')
  console.log(mm)
    
  }




  _fetchUsers() {
    this.userService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map((users: any[]) =>
        users.filter((user: any) => user.kycStatus === '1')
      )
    ).subscribe(data => {
      // data now contains only the users where idVerified is true
      console.log(data);
      this.kyc = data;
    });
  }


  _fetchUsersData() {
    this.userService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),

      map((users: any[]) =>
        users.filter((user: any) => user.kycStatus
          === '1')
      )
    ).subscribe(data => {
      // data now contains only the users where idVerified is true
      this.users = data;

      console.log(data)
      this.switchToDay('all');
    });
  }
  fetchAch() {
    this.ach.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log(data)
      this.achData = data
      this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw')
      this.totalDeposit = this.achData.filter((transaction: any) => transaction.transition_type === 'deposit')


      let sumWithdrawals = 0;
      let sumDeposit = 0;
      for (const item of this.totalWithdraw) {
        sumWithdrawals += item.amount_net;
      }
      for (const item of this.totalDeposit) {
        sumDeposit += item.amount_net;
      }
      this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
      this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
      this.getUserTransactions(data)

    })
  }
  showInfo(index: number) {
    //check that the users arrayis not null
    if (this.paymentUpdate.length > 0) {
      // get a specific user from the index in the list of users 
      //and pass it  to selected user object
      var targetId = this.paymentUpdate[index]['email'];

      console.log(targetId, this.paymentUpdate[index]);


      const filteredObject = this.users.filter((user: any) =>
        (user.email && user.email.toLowerCase().includes(targetId.toLowerCase()))
      );

      if (filteredObject) {
        console.log(filteredObject);
      } else {
        console.log("No object found with the specified ID.");
      }

      // Stringify selected user 
      const stringifiedUser = JSON.stringify(filteredObject);
      // route to customer details screen and pass stringified user as arguement
      this.router.navigate(['/admin/customer-details', { userInfo: stringifiedUser }]);
    }
  }
  getTransactionDetails(index: number) {
    //check that the users arrayis not null
    if (this.paymentUpdate.length > 0) {
      // get a specific user from the index in the list of users 
      //and pass it  to selected user object
      let selectedUser = this.paymentUpdate[index];
      console.log(selectedUser)
      // Stringify selected user 
      const stringifiedTransaction = JSON.stringify(selectedUser);
      // route to customer details screen and pass stringified user as arguement
      this.router.navigate(['/admin/user-transaction', { transactionInfo: stringifiedTransaction }]);
    }

  }

  _fetchAllTransactions() {

    this.transactionService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {

      // Assign the slice of transactions to be displayed in the current page to the filteredTransactions property
      this.transactions = data
      this.paymentUpdate = this.transactions.slice(0, 10);


    });


  }


  formatValue(data: any): string {
    const roundedValue = Math.round(data);
    const formattedValue = '$' + roundedValue.toLocaleString();

    return formattedValue
  }

  getUserTransactions(transactions: Ach[]) {
    const userTransactions: { [name: string]: UserTransaction } = {};

    transactions.forEach((transaction) => {
      if (!userTransactions[transaction.firstName]) {
        userTransactions[transaction.firstName] = { firstName: transaction.firstName, lastName: transaction.lastName, deposit: 0, withdraw: 0 };
      }
      if (transaction.transition_type === 'deposit') {
        userTransactions[transaction.firstName].deposit += transaction.amount_net;
      } else {
        userTransactions[transaction.firstName].withdraw += transaction.amount_net;
      }
    });

    const result: UserTransactionWithAverage[] = [];

    for (let user in userTransactions) {
      const userTransaction = userTransactions[user];
      const average = (userTransaction.deposit - userTransaction.withdraw) / 2;

      // Push the formatted values to the result array
      result.push({ firstName: userTransaction.firstName, lastName: userTransaction.lastName, deposit: `$${userTransaction.deposit.toFixed(2)}`, withdraw: `$${userTransaction.withdraw.toFixed(2)}`, average: `$${average.toFixed(2)}` });
    }

    // Sort the result array based on deposit amount in descending order
    result.sort((a, b) => {
      if (a.deposit < b.deposit) {
        return 1; // Return 1 to indicate a should come after b
      }
      if (a.deposit > b.deposit) {
        return -1; // Return -1 to indicate a should come before b
      }
      return 0; // Return 0 for equal deposit amounts
    });

    this.topTransactions = result;
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
    this.paymentUpdate.sort((a: any, b: any) => {
      let comparison = 0;

      if (a[columnName] > b[columnName]) {
        comparison = 1;
      } else if (a[columnName] < b[columnName]) {
        comparison = -1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  sortTables(columnName: string) {
    if (this.sortColumn === columnName) {
      // If the same column is clicked again, reverse the sorting direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, set it as the new sorting column
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    }

    // Sort the table data based on the selected column and direction
    this.topTransactions.sort((a: any, b: any) => {
      let comparison = 0;

      if (a[columnName] > b[columnName]) {
        comparison = 1;
      } else if (a[columnName] < b[columnName]) {
        comparison = -1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }


  switchToDay(timePeriod: any) {
    // Calculate the start date for the filter
    const today = new Date();
    const startDate = new Date();
    switch (timePeriod) {
      case 'today':

        startDate.setDate(today.getDate());
        // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
        this.kyc_count =  this.users.filter((user: any) => new Date(user.registration_date
          .toMillis()) === startDate).length;
        this.period = 'Today'
        console.log(this.kyc_count);
        break;
      case 'week':

        startDate.setDate(today.getDate() - 7);
        // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
        this.kyc_count =this.users.filter((user: any) => new Date(user.registration_date
          .toMillis()) >= startDate).length;
        this.period = 'Week'
        console.log(this.kyc_count);
        break;
        case 'last2Weeks':

          startDate.setDate(today.getDate() - 14);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.kyc_count =  this.users.filter((user: any) => new Date(user.registration_date
            .toMillis()) >= startDate).length;
          this.period = 'Last 2 Weeks'
          console.log(this.kyc_count);
          break;
      case 'month':

        startDate.setDate(today.getDate() - 30);
        // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
        this.kyc_count =  this.users.filter((user: any) => new Date(user.registration_date
          .toMillis()) >= startDate).length;
        this.period = 'Month'
        console.log(this.kyc_count);
        break;
      case 'last3Months':

        startDate.setDate(today.getDate() - 90);
        // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
        this.kyc_count =  this.users.filter((user: any) => new Date(user.registration_date
          .toMillis()) >= startDate).length;
        this.period = 'Last 3 Months'
        console.log(this.kyc_count);
        break;
      case 'last6Months':

        startDate.setDate(today.getDate() - 180);
        // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
        this.kyc_count = this.users.filter((user: any) => new Date(user.registration_date
          .toMillis()) >= startDate).length;
        this.period = 'Last 6 Months'
        console.log(this.kyc_count);
        break;
      case 'past1Year':

        startDate.setDate(today.getDate() - 360);
        // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
        this.kyc_count = this.users.filter((transaction: any) => new Date(transaction.registration_date
          .toMillis()) >= startDate).length;
        this.period = 'Year'
        console.log(this.kyc_count);
        break;
      case 'all':
        this.period = 'All'
        this.kyc_count = this.users.length;
        return this.kyc_count;
      default:
        this.users.length
        break;
    }


    return;
  }

  switchToDayACH(timePeriod: any, type: any) {
    // Calculate the start date for the filter
    const today = new Date();
    const startDate = new Date();
    let sumWithdrawals = 0;
    let sumDeposit = 0;
    if (type === 'deposit') {
      switch (timePeriod) {
        case 'today':

          startDate.setDate(today.getDate());
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalDeposit = this.achData.filter((transaction: any) =>transaction.transition_type === 'deposit'&& new Date(transaction.created_at

            .toMillis()) === startDate);
          this.periodD = 'Today'
          for (const item of this.totalDeposit) {
            sumDeposit += item.amount_net;
          }
          this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
          console.log(this.total_deposit)
          break;
        case 'week':

          startDate.setDate(today.getDate() - 7);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalDeposit = this.achData.filter((transaction: any) =>transaction.transition_type === 'deposit'&& new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodD = 'Week'
          for (const item of this.totalDeposit) {
            sumDeposit += item.amount_net;
          }
          this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
          console.log(this.total_deposit)
          break;
          case 'last2Weeks':

            startDate.setDate(today.getDate() - 14);
            // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
            this.totalDeposit= this.achData.filter((transaction: any) => transaction.transition_type === 'deposit' && new Date(transaction.created_at
  
              .toMillis()) >= startDate);
            console.log(this.totalDeposit)
            this.periodW = 'Last 2 Weeks'
            for (const item of this.totalDeposit) {
              sumDeposit += item.amount_net;
            }
            this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
          console.log(this.total_deposit)
            break;
        case 'month':
          startDate.setDate(today.getDate() - 30);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalDeposit= this.achData.filter((transaction: any) => transaction.transition_type === 'deposit' && new Date(transaction.created_at

            .toMillis()) >= startDate);
          console.log(this.totalDeposit)
          this.periodW = 'Last Month'
          for (const item of this.totalDeposit) {
            sumDeposit += item.amount_net;
          }
          this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
        console.log(this.total_deposit)
          break;
        case 'last3Months':

          startDate.setDate(today.getDate() - 90);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalDeposit = this.achData.filter((transaction: any) =>transaction.transition_type === 'deposit'&& new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodD = 'Last 3 Months'
          for (const item of this.totalDeposit) {
            sumDeposit += item.amount_net;
          }
          this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
          console.log(this.total_deposit)
          break;
        case 'last6Months':

          startDate.setDate(today.getDate() - 180);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalDeposit = this.achData.filter((transaction: any) =>transaction.transition_type === 'deposit'&& new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodD = 'Last 6 Months'
          for (const item of this.totalDeposit) {
            sumDeposit += item.amount_net;
          }
          this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
          console.log(this.total_deposit)
          break;
        case 'past1Year':

          startDate.setDate(today.getDate() - 360);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalDeposit = this.achData.filter((transaction: any) =>transaction.transition_type === 'deposit'&& new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodD = 'Year'
          for (const item of this.totalDeposit) {
            sumDeposit += item.amount_net;
          }
          this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
          console.log(this.total_deposit)
          break;
        case 'all':
          this.periodD = 'all'
          this.totalDeposit = this.achData.filter((transaction: any) =>transaction.transition_type === 'deposit');
          for (const item of this.totalDeposit) {
            sumDeposit += item.amount_net;
          }
          this.total_deposit = '$' + Number(sumDeposit.toFixed(2)).toLocaleString();
          console.log(this.total_deposit)
          break;
        default:
          this.total_deposit
          break;
      }

    } if (type === 'withdraw') {
      switch (timePeriod) {
        case 'today':

          startDate.setDate(today.getDate());
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw' && new Date(transaction.created_at

            .toMillis()) === startDate);
          this.periodW = 'Today'

          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);
          break;
        case 'week':

          startDate.setDate(today.getDate() - 7);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw' && new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodW = 'Week'
          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);
          break;
        case 'last2Weeks':

          startDate.setDate(today.getDate() - 14);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw' && new Date(transaction.created_at

            .toMillis()) >= startDate);
          console.log(this.totalWithdraw)
          this.periodW = 'Last 2 Weeks'
          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);
          break;
            case 'last2Weeks':

          startDate.setDate(today.getDate() - 14);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw' && new Date(transaction.created_at

            .toMillis()) >= startDate);
          console.log(this.totalWithdraw)
          this.periodW = 'Last 2 Weeks'
          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);
          break;
        case 'month':

          startDate.setDate(today.getDate() - 30);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw' && new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodW = 'Month'
          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);
          break;
        case 'last3Months':

          startDate.setDate(today.getDate() - 90);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw' && new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodW = 'Month'
          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);
          break;
        case 'last6Months':

          startDate.setDate(today.getDate() - 180);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw' && new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodW = 'Last 6 Months'
          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);
          break;
        case 'past1Year':

          startDate.setDate(today.getDate() - 360);
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw' && new Date(transaction.created_at

            .toMillis()) >= startDate);
          this.periodW = 'Year'
          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);
          break;
        case 'all':
          // Filter the transactions by the start date and assign the filtered transactions to the filteredTransactions property
          this.totalWithdraw = this.achData.filter((transaction: any) => transaction.transition_type === 'withdraw');

          this.periodW = 'All'
          for (const item of this.totalWithdraw) {
            sumWithdrawals += item.amount_net;
          }
          this.total_withdrawal = '$' + Number(sumWithdrawals.toFixed(2)).toLocaleString();
          console.log(this.totalWithdraw);

          break;
        default:
          this.total_withdrawal
          break;
      }

    }


    return;
  }



}
