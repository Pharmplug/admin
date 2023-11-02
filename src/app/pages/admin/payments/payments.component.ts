
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
const currencySymbol = require('currency-symbol');

import { PaymentService } from './payments.service';

import { MatSort } from '@angular/material/sort';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import PharmacyModel from 'src/app/models/pharmacy.model';
import Customer from 'src/app/models/user.model';
import Purchase from 'src/app/models/payment.model';
import PurchaseModel from 'src/app/models/payment.model';

@Component({
  selector: 'app-pages-transactions',
  templateUrl: './payments.component.html',
  providers: [PaymentService]
})
export class PaymentsComponent implements OnInit {
  @ViewChild(MatSort)


  paymentList: PurchaseModel[] = [];
  filteredPaymentList: PurchaseModel[] = [];
  searchTerm = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  showLoginButton: boolean = true;
  storeForm!: FormGroup;
  constructor(public dialog: Dialog,
    public router: Router, public http: HttpClient, private toastr: ToastrService, private paymentService: PaymentService, private formBuilder: FormBuilder,) {


  }

  ngOnInit(): void {

    this._fetchData();

    this.storeForm = this.formBuilder.group({
      imageurl: [''],
      productcode: [''],
      price: [''],
      dosageform: [''],
      companyname: [''],
      category: [''],
      packsize: [''], productname: [''],
    });
  }




  // This function fetches all the data from the collection and subscribes to the changes
  _fetchData() {
    this.paymentService.getPayments()
      .then((result) => {
        this.paymentList = result
        this.filteredPaymentList = result
      })
  }


  /**
   * Filters transactions based on a search term entered by the item.
   */
  searchUsers() {
    if (this.searchTerm.trim() !== '') {
      const mitems = this.filteredPaymentList!.filter((item) =>
        (item.reference && item.reference.toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.customercode && item.customercode.toString().toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.created_at && item.created_at.toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.currency && item.currency.toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.amount && item.amount.toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase()))
      );
      this.filteredPaymentList = mitems
    } else {
      // Reset the items array when the search term is empty
      this.filteredPaymentList = this.paymentList
    }
  }





  showInfo(item: any) {

    let selecteditem = item;
    // Stringify selected user 
    const stringifieditem = JSON.stringify(selecteditem);
    // route to customer details screen and pass stringified user as arguement
    this.router.navigate(['/admin/payment-details', { itemInfo: stringifieditem }]);

  }

  onTableDataChange(event: any) {
    // this.filteredpaymentList= []
    this.page = event;
    // this._fetchData()
    this.filteredPaymentList
  }

  onTableSizeChange(event: any) {
    this.tableSize = event?.target.value;
    this.page = 1;
    // this._fetchData()
    this.filteredPaymentList
  }

  


  convertToInt(value: any) {
    const res = parseInt(value) / 100
    return res.toString()
  }
 

}
