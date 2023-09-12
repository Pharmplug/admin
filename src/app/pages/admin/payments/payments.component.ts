
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const currencySymbol = require('currency-symbol');

import { PaymentService} from './payments.service';

import { MatSort } from '@angular/material/sort';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import PharmacyModel from 'src/app/models/wallets.model';
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
    public router: Router, public http: HttpClient,private toastr: ToastrService, private paymentService:PaymentService,private formBuilder: FormBuilder,) {


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
      packsize: [''],productname: [''],
    });
  }




  setSymbol(sym: any) {
    let data = currencySymbol.symbol(sym)
    return data;

  }

  // This function fetches all the data from the collection and subscribes to the changes
  _fetchData() {

    this. paymentService.getPayments()
      .then((result) => {
        this.paymentList = result 
        this.filteredPaymentList =result 
      })


  }


  /**
   * Filters transactions based on a search term entered by the item.
   */
  searchUsers() {
    if (this.searchTerm.trim() !== '') {
      const mitems =  this.filteredPaymentList!.filter((item) =>
        (item.reference && item.reference.toLowerCase() .includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.customercode && item.customercode.toString().toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase())) ||
        (item.created_at && item.created_at.toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase())) ||
        (item.currency && item.currency.toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase())) ||
        (item.amount && item.amount.toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase()))
      );
       this.filteredPaymentList = mitems
    } else {
      // Reset the items array when the search term is empty
       this.filteredPaymentList=this.paymentList
    }
  }


  isEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test(email);
    if (result) {
      return email;
      
    }else{
      return ""
    }
  
  }

 isPhoneNumber(input: string) {
    // Remove any non-digit characters from the input
    const cleanInput = input.replace(/\D/g, '');
  
    // Check if the cleaned input has exactly 10 digits
   const result= cleanInput.length === 11;
    if (result) {
      return input;
      
    }else{
      return ""
    }

  }
  



  showInfo(item:any) {
  
      let selecteditem = item;
      // Stringify selected user 
      const stringifieditem = JSON.stringify(selecteditem);
      // route to customer details screen and pass stringified user as arguement
      this.router.navigate(['/admin/customer-details', { itemInfo: stringifieditem }]);
    
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

  get itemData() { return this.storeForm.controls; }


convertToInt(value:any)
{
 const res= parseInt(value)/100
 return res.toString()
}
  onSubmit() {
    this.showLoginButton = false;
    // Check if the form is invalid
    if (this.storeForm.invalid) {
      // Show error message if form is invalid
      this.toastr.error('Invalid form data', 'Error', {
        timeOut: 3000,
      });
      this.showLoginButton = true;
      return; // exit function early
    }

    // Check if any required field is empty
    if (this.itemData['price'].value.trim() === '' || this.itemData['imageurl'].value.trim() === ''|| this.itemData['category'].value.trim() === ''|| this.itemData['companyname'].value.trim() === '' || this.itemData['dosageform'].value.trim() === '' || this.itemData['productname'].value.trim() === '' || this.itemData['packsize'].value.trim() === '' || this.itemData['productcode'].value.trim() === null) {
      // Show error message if any required field is empty
      this.toastr.error('Please fill all fields', 'Error', {
        timeOut: 3000,
      });
      this.showLoginButton = true;
      return; // exit function early
    }

    if (!this.itemData['imageurl'].value.trim().startsWith("https://")) {
      this.toastr.error("Invalid image URL format", 'Error', {
        timeOut: 3000,
      });
      this.showLoginButton = true;
      return ;
  }


  const newitem = {
    price: this.itemData['price'].value.trim(),
    imageurl: this.itemData['imageurl'].value.trim(),
    category: this.itemData['category'].value.trim(),
    companyname: this.itemData['companyname'].value.trim(),
    dosageform: this.itemData['dosageform'].value.trim(),
    productname: this.itemData['productname'].value.trim(),
    packsize: this.itemData['packsize'].value.trim(),
    productcode: this.itemData['productcode'].value.trim(),
};

    // Call the addLoginAllowData method from the iamService with the newEmail object
    // this. paymentService.additem(newitem)
    //   .then((value) => {

    //     // Show success message if admin is added successfully
    //     this.toastr.success(`${value.data.productname
    //     } made by ${value.data.companyname} has been added`, `Success `, {
    //       timeOut: 3000,
    //     });
    //     this.showLoginButton = true;
    //     // Reset the form after the success message is shown
    //     this.storeForm.reset();
    //     this._fetchData()
    //   })
    //   .catch(error => console.log(error));
  }

}
