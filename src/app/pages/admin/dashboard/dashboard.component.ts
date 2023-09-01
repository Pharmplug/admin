import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Ach from 'src/app/models/ach.model';
import { UserService } from '../customers/customers.service';
import Customer from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Recipient from 'src/app/models/request.model';
import { RequestService } from '../request/request.service';


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

  users_count!: Number;
  achData: any
  total_deposit: any = 0;
  total_withdrawal: any = 0;
  kyc_count: number = 0;
request_count: number = 0;
user_count: number = 0;
  kyc: any
  totalWithdraw!: any
  totalDeposit!: any

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
  requestUpdate: Recipient[] = [];

  usersList: Customer[] = [];

  constructor(private router: Router, private userService: UserService, private elementRef: ElementRef, private db: AngularFirestore,  public http: HttpClient,private requestService:RequestService) { }

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    //this.fetchAch()
  
    this. _fetchRequest()
    this._fetchUsers()
    this.switchToDay('all');
   this. request_count
   
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


  async _fetchRequest() {

    var value = await this.requestService.getAll()
    console.log(value)
    this.requestUpdate = value['data']
    console.log(this.request_count)
    this.request_count=this.requestUpdate.length
    console.log(this.request_count)
  }

  async _fetchUsers() {

    this.userService.getUsers()
    .then((result) => {
      this.usersList = result 
      this.user_count=this.usersList.length
    })
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

  sortTables(columnName: string) {
 
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
