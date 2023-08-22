
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const currencySymbol = require('currency-symbol');
import Transaction from "../../../models/transaction.model"
import { DrugService } from './drug.service';
import { PdfGeneratorService } from 'src/app/shared/pdf-generate/pdf-generator.service';
import jsPDF from 'jspdf';
import { MatSort } from '@angular/material/sort';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import Drugs from 'src/app/models/drugs.model';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pages-transactions',
  templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
  @ViewChild(MatSort)


  drugsList: Drugs[] = [];
  filteredDrugsList: Drugs[] = [];
  searchTerm = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  showLoginButton: boolean = true;
  storeForm!: FormGroup;
  constructor(public dialog: Dialog,
    public router: Router, public http: HttpClient,private toastr: ToastrService, private drugService:DrugService,private formBuilder: FormBuilder,) {


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

    this.drugService.getStore()
      .then((result) => {
        this.drugsList = result 
        this.filteredDrugsList =result 
      })


  }


  /**
   * Filters transactions based on a search term entered by the drug.
   */
  searchDrug() {
    if (this.searchTerm.trim() !== '') {
      const mitems = this.filteredDrugsList!.filter((drug) =>
        (drug.productname && drug.productname.toLowerCase() .includes(this.searchTerm.toLowerCase() || this.searchTerm.toUpperCase())) ||
        (drug.price && drug.price.toString().toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase())) ||
        (drug.created_at && drug.created_at.toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase())) ||
        (drug.companyname && drug.companyname.toLowerCase().includes(this.searchTerm.toLowerCase()|| this.searchTerm.toUpperCase()))
      );
      this.filteredDrugsList = mitems
    } else {
      // Reset the items array when the search term is empty
      this.filteredDrugsList=this.drugsList
    }
  }






  showInfo(drug:any) {
  
      let selectedDrug = drug;
      // Stringify selected user 
      const stringifiedDrug = JSON.stringify(selectedDrug);
      // route to customer details screen and pass stringified user as arguement
      this.router.navigate(['/admin/drug-details', { drugInfo: stringifiedDrug }]);
    
  }

  onTableDataChange(event: any) {
    //this.filteredDrugsList= []
    this.page = event;
   // this._fetchData()
    this.filteredDrugsList
  }

  onTableSizeChange(event: any) {
    this.tableSize = event?.target.value;
    this.page = 1;
   // this._fetchData()
    this.filteredDrugsList
  }

  get drugData() { return this.storeForm.controls; }




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
    if (this.drugData['price'].value.trim() === '' || this.drugData['imageurl'].value.trim() === ''|| this.drugData['category'].value.trim() === ''|| this.drugData['companyname'].value.trim() === '' || this.drugData['dosageform'].value.trim() === '' || this.drugData['productname'].value.trim() === '' || this.drugData['packsize'].value.trim() === '' || this.drugData['productcode'].value.trim() === null) {
      // Show error message if any required field is empty
      this.toastr.error('Please fill all fields', 'Error', {
        timeOut: 3000,
      });
      this.showLoginButton = true;
      return; // exit function early
    }

    if (!this.drugData['imageurl'].value.trim().startsWith("https://")) {
      this.toastr.error("Invalid image URL format", 'Error', {
        timeOut: 3000,
      });
      this.showLoginButton = true;
      return ;
  }


  const newDrug = {
    price: this.drugData['price'].value.trim(),
    imageurl: this.drugData['imageurl'].value.trim(),
    category: this.drugData['category'].value.trim(),
    companyname: this.drugData['companyname'].value.trim(),
    dosageform: this.drugData['dosageform'].value.trim(),
    productname: this.drugData['productname'].value.trim(),
    packsize: this.drugData['packsize'].value.trim(),
    productcode: this.drugData['productcode'].value.trim(),
};

    // Call the addLoginAllowData method from the iamService with the newEmail object
    this.drugService.addDrug(newDrug)
      .then((value) => {

        // Show success message if admin is added successfully
        this.toastr.success(`${value.data.productname
        } made by ${value.data.companyname} has been added`, `Success `, {
          timeOut: 3000,
        });
        this.showLoginButton = true;
        // Reset the form after the success message is shown
        this.storeForm.reset();
        this._fetchData()
      })
      .catch(error => console.log(error));
  }

}
