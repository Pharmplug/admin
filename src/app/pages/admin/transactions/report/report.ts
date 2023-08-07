import { Component, Inject } from "@angular/core";
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { PdfGeneratorService } from 'src/app/shared/pdf-generate/pdf-generator.service';
import { TransactionService } from "../transaction.service";
import { map } from "rxjs";
import Transaction from "src/app/models/transaction.model";
import { DatePipe } from '@angular/common';



@Component({
  selector: 'report-dialog',
  templateUrl: 'report.html',
  styleUrls: ['./report.css'],
  providers: [DatePipe]
})
export class ReportDialog {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  constructor(@Inject(DIALOG_DATA) public data: any, private pdfGenerate: PdfGeneratorService, private transactionService: TransactionService, private datePipe: DatePipe) { }
  order: any = [];
  orderPDF: any = [];
  option1!: any
  toppings = ['Id', 'Date', 'Name', 'Email', 'Phone', 'Stellar Address', 'Transaction Amount', 'Fee', 'Net Amount', 'Transaction Type'];
  setHead: any;
  setHeaders: any
  heads: any = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "amount_fee",
    "amount_net",
    "asset_code",
    "comments",
    "completed_at",
    "country",
    "deducted",
    "discount",
    "email_status",
    "exchangeRate",
    "external_id",
    "id",
    "internal_id",
    "isDeducted",
    "memo",
    "memo_type",
    "refunded",
    "status",
    "stellar_address",
    "token_amount",
    "transactionReference",
    "transaction_hash",
    "transaction_mode",
    "transition_type",
    "processed_at",
    "tx_initiator"
  ]

  filteredHeads: any = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "amount_net",
    "created_at",
    "processed_at",
    "asset_code",
    "completed_at",
    "country",
    "status",
    "token_amount",
    "transition_type",
  ]

  filteredHeader: any = [
    "FirstName",
    "LastName",
    "Phone Number",
    "Email",
    "Amount",
    "Created",
    "Processed Time",
    "Asset code",
    "Completed Time",
    "Country",
    "Status",
    "Token Amount",
    "Transition Type",
  ]
  ngOnInit() {
    this._fetchData()
    this.option1

  }

  addToOrder(item: any) {
    const index = this.order.indexOf(item);
    if (index > -1) {
      this.order.splice(index, 1);
    } else {
      this.order.push(item);
    }
  }
  addToOrderPDF(item: any) {
    const index = this.orderPDF.indexOf(item);
    if (index > -1) {
      this.orderPDF.splice(index, 1);
    } else {
      this.orderPDF.push(item);
    }
  }

  resetOrder() {
    this.order = [];
  }
  resetOrderPDF() {
    this.orderPDF = [];
  }

  generateReport() {
    this.setHead = this.filteredHeads
    this.setHeaders = this.filteredHeader
    this.pdfGenerate.exportToExcel(this.filteredTransactions, this.setHead, this.setHeaders);
  }


  _fetchData() {
    this.transactionService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.transactions = data;
      this.transactions.forEach((trans: any) => {
        const timestamp = trans.created_at;
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const formattedDate = this.datePipe.transform(date, 'medium');
        trans.created_at = formattedDate;
        trans.completed_at = formattedDate;
        trans.processed_at = formattedDate;
      });

      console.log(this.transactions)
    });
  }


  filterTransactions(type: string) {
    console.log(type)
    if (type === 'all') {
      this.filteredTransactions = this.transactions
      console.log(this.data)

    } if (type === 'Direct Payment') {
      this.setHead = this.filteredHeads
      this.setHeaders= this.filteredHeader
      this.filteredTransactions = this.transactions.filter((transaction: any) => transaction.transition_type === type)
      console.log(this.filteredTransactions)

    } if (type === 'deposit') {
      this.heads = this.filteredHeads
      this.filteredTransactions = this.transactions.filter((transaction: any) => transaction.transition_type === type)
      console.log(this.filteredTransactions)

    } if (type === 'withdrawal') {
      this.heads = this.filteredHeads
      this.filteredTransactions = this.transactions.filter((transaction: any) => transaction.transition_type === type)
      console.log(this.filteredTransactions)

    }
    if (type === 'send') {
      this.heads = this.filteredHeads
      this.filteredTransactions = this.transactions.filter((transaction: any) => transaction.transition_type === type)
      console.log(this.filteredTransactions)

    } if (type === 'received') {
      this.filteredTransactions = this.transactions.filter((transaction: any) => transaction.transition_type === type)
      console.log(this.filteredTransactions)

    }
  }

}