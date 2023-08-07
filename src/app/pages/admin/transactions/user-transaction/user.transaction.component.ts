import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Transaction from "../../../../models/transaction.model"
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-user-transactions',
  templateUrl: './user.transaction.component.html',
  styleUrls: ['./user.transaction.component.css'],
  providers: [TransactionService]
})
export class UserTransactionComponent implements OnInit {
  parsedTransactioinDetails:any;
  transactionInfoString: any = '';
  ipconfig!:Transaction;
  userTransactionInfo!: Transaction;
  constructor(private route: ActivatedRoute) {
    // initialize the filteredTransactions array with all transactions
  

  }

  ngOnInit(): void {
    // get the user data from the route arguement passed from the customer screen
    this.transactionInfoString = this.route.snapshot.paramMap.get('transactionInfo');
    console.log(this.transactionInfoString)
    // parse the stringified data into a JSON object
    this.parsedTransactioinDetails =JSON.parse(this.transactionInfoString);
    //pass parsed data to userTransactionInfo model
    this.userTransactionInfo = this.parsedTransactioinDetails

    console.log('this.userTransactionInfo')
    // pass parsed data to ipConfig datatype
    this.ipconfig= this.parsedTransactioinDetails['ipConfig']
    console.log(this.ipconfig)

  }




}
