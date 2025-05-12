
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

const currencySymbol = require('currency-symbol');

import { PharmService } from './pharmacy.service';

import { MatSort } from '@angular/material/sort';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import PharmacyModel from 'src/app/models/pharmacy.model';

@Component({
  selector: 'app-pages-transactions',
  templateUrl: './pharmacy.component.html',
  providers: [PharmService]
})
export class PharmacyComponent implements OnInit {
  @ViewChild(MatSort)


  pharmacyList: PharmacyModel[] = [];
  filteredPharmacyList: PharmacyModel[] = [];
  searchTerm = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  showSubmitButton: boolean = true;
  pharmacyForm!: FormGroup;
  constructor(public dialog: Dialog,
    public router: Router, public http: HttpClient, private toastr: ToastrService, private pharmService: PharmService, private formBuilder: FormBuilder,) {


  }

  ngOnInit(): void {

    this._fetchData();
   
    this.pharmacyForm = this.formBuilder.group({
      imageurl: [''],
      name: [''],
      city: [''],
      state: [''],
      email: [''],
      phone: [''],
      password: [''],
      confirmPassword: [''],
      address: [''],

    });
  }




  setSymbol(sym: any) {
    let data = currencySymbol.symbol(sym)
    return data;

  }

  // This function fetches all the data from the collection and subscribes to the changes
  _fetchData() {

    this.pharmService.getPharmacies()
      .then((result) => {
        this.pharmacyList = result
        this.filteredPharmacyList = result
      })


  }


  /**
   * Filters transactions based on a search term entered by the item.
   */
  searchPharm() {
    if (this.searchTerm.trim() !== '') {
      const mitems = this.filteredPharmacyList!.filter((item) =>
        (item.name && item.name.toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.state && item.state.toString().toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.created_at && item.created_at.toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.address && item.address.toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (item.city && item.city.toLowerCase().includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase()))
      );
      this.filteredPharmacyList = mitems
    } else {
      // Reset the items array when the search term is empty
      this.filteredPharmacyList = this.pharmacyList
    }
  }






  showInfo(item: any) {

    let selecteditem = item;
    // Stringify selected user 
    const stringifieditem = JSON.stringify(selecteditem);
    // route to customer details screen and pass stringified user as arguement
    this.router.navigate(['/admin/pharmacy-details', { pharmInfo: stringifieditem }]);

  }

  onTableDataChange(event: any) {
    // this.filteredPharmacyList= []
    this.page = event;
    // this._fetchData()
    this.filteredPharmacyList
  }

  onTableSizeChange(event: any) {
    this.tableSize = event?.target.value;
    this.page = 1;
    // this._fetchData()
    this.filteredPharmacyList
  }

  get itemData() { return this.pharmacyForm.controls; }




  onSubmit() {
    this.showSubmitButton = false;
    // Check if the form is invalid
    if (this.pharmacyForm.invalid) {
      // Show error message if form is invalid
      this.toastr.error('Invalid form data', 'Error', {
        timeOut: 3000,
      });
      this.showSubmitButton = true;
      return; // exit function early
    }

    // Check if any required field is empty
    if (this.itemData['name'].value.trim() === '' ||
      this.itemData['imageurl'].value.trim() === '' ||
      this.itemData['phone'].value.toString().trim() === '' ||
      this.itemData['password'].value.trim() === '' ||
      this.itemData['confirmPassword'].value.trim() === '' ||
      this.itemData['email'].value.trim() === '' ||
      this.itemData['address'].value.trim() === '' ||
      this.itemData['state'].value.trim() === '' ||
      this.itemData['city'].value.trim() === '') {
      // Show error message if any required field is empty
      this.toastr.error('Please fill all fields', 'Error', {
        timeOut: 3000,
      });
      this.showSubmitButton = true;
      return; // exit function early
    }

    if (!this.itemData['imageurl'].value.trim().startsWith("https://")) {
      this.toastr.error("Invalid image URL format", 'Error', {
        timeOut: 3000,
      });
      this.showSubmitButton = true;
      return;
    }
    if (this.itemData['password'].value.trim() !== this.itemData['confirmPassword'].value.trim()) {
      this.toastr.error("passwords do not match", 'Error', {
        timeOut: 3000,
      });
      this.showSubmitButton = true;
      return;
    }

    const newitem = {
      name: this.itemData['name'].value,
      logo: this.itemData['imageurl'].value,
      phone: this.itemData['phone'].value,
      password: this.itemData['password'].value,
      email: this.itemData['email'].value.toLowerCase(),
      address: this.itemData['address'].value,
      state: this.itemData['state'].value,
      city: this.itemData['city'].value,
      confirmPassword: this.itemData['password'].value
    };
    console.log(newitem);
    // Call the addPharmacy method
    this.pharmService.addPharmplug(newitem)
      .then((value) => {

        // Show success message if admin is added successfully
        this.toastr.success(`Pharmacy ${value.data.name
          } been added`, `Success `, {
          timeOut: 3000,
        });
        this.showSubmitButton = true;
        // Reset the form after the success message is shown
        this.pharmacyForm.reset();
        this._fetchData()
      })
      .catch(error => console.log(error));
  }

}
