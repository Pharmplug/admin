
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const currencySymbol = require('currency-symbol');

import { CoverageService } from './coverage.service';

import { MatSort } from '@angular/material/sort';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import PharmacyModel from 'src/app/models/wallets.model';
import Customer from 'src/app/models/user.model';

@Component({
  selector: 'app-pages-transactions',
  templateUrl: './customers.component.html',
  providers: [CoverageService]
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatSort)


  usersList: Customer[] = [];
  filteredUsersList: Customer[] = [];
  searchTerm = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  showLoginButton: boolean = true;
  storeForm!: FormGroup;
  constructor(public dialog: Dialog,
    public router: Router, public http: HttpClient,private toastr: ToastrService, private coverageService:CoverageService,private formBuilder: FormBuilder,) {


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

    this.coverageService.getAll()
      .then((result) => {
        this.usersList = result 
        this.filteredUsersList =result 
      })


  }


  /**
   * Filters transactions based on a search term entered by the item.
   */
  searchUsers() {
    if (this.searchTerm.trim() !== '') {
      const mitems =  this.filteredUsersList!.filter((item) =>
        (item.firstName && item.firstName.toLowerCase() .includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.firstName && item.firstName.toString().toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase())) ||
        (item.created_at && item.created_at.toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase())) ||
        (item.lastName && item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase())) ||
        (item.lastName && item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase()))
      );
       this.filteredUsersList = mitems
    } else {
      // Reset the items array when the search term is empty
       this.filteredUsersList=this.usersList
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
    // this.filteredUsersList= []
    this.page = event;
   // this._fetchData()
     this.filteredUsersList
  }

  onTableSizeChange(event: any) {
    this.tableSize = event?.target.value;
    this.page = 1;
   // this._fetchData()
     this.filteredUsersList
  }

  get itemData() { return this.storeForm.controls; }




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
    // this.coverageService.additem(newitem)
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
