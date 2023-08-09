import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import Transaction from "../../../../models/transaction.model"

import { AchService } from '../requests.service';

@Component({
  selector: 'app-pages-user-transactions',
  templateUrl: './requests.info.component.html',
})
export class RequestInfoComponent implements OnInit {
  parsedTransactioinDetails:any;
  transactionInfoString: any = '';
  ipconfig!:Transaction;
  userTransactionInfo!: Transaction;
  constructor(private route: ActivatedRoute, private ach: AchService) {
    // initialize the filteredTransactions array with all transactions
  

  }

  ngOnInit(): void {
    // get the user data from the route arguement passed from the customer screen
    this.transactionInfoString = this.route.snapshot.paramMap.get('transactionInfo');
    // parse the stringified data into a JSON object
    this.parsedTransactioinDetails =JSON.parse(this.transactionInfoString);
    //pass parsed data to userTransactionInfo model
    this.userTransactionInfo = this.parsedTransactioinDetails
    console.log(this.userTransactionInfo)
    // pass parsed data to ipConfig datatype
    this.ipconfig= this.parsedTransactioinDetails['ipConfig']
    console.log(this.ipconfig)
  }




}
