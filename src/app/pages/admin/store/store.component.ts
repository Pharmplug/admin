
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

@Component({
  selector: 'app-pages-transactions',
  templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
  @ViewChild(MatSort)


  drugsList: Drugs[] = [];
  filteredDrugsList: Drugs[] = [];
  searchTerm = '';

  constructor(public dialog: Dialog,
    public router: Router, public http: HttpClient, private drugService:DrugService) {


  }

  ngOnInit(): void {

    this._fetchData();


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
      const mitems = this.drugsList!.filter((drug) =>
        (drug.productname && drug.productname.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (drug.price && drug.price.toString().toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (drug.created_at && drug.created_at.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (drug.companyname && drug.companyname.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
      this.filteredDrugsList = mitems
    } else {
      // Reset the items array when the search term is empty
      this.drugsList;
    }
  }






  showInfo(index: number) {
    //check that the users arrayis not null
    if (this.filteredDrugsList.length > 0) {
      // get a specific user from the index in the list of users 
      //and pass it  to selected user object
      let selectedDrug = this.filteredDrugsList[index];
      // Stringify selected user 
      const stringifiedDrug = JSON.stringify(selectedDrug);
      // route to customer details screen and pass stringified user as arguement
      this.router.navigate(['/admin/drug-details', { drugInfo: stringifiedDrug }]);
    }
  }




}
