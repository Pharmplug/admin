
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
const currencySymbol = require('currency-symbol');
import Transaction from "../../../models/transaction.model"
import { TransactionService } from './transaction.service';
import { PdfGeneratorService } from 'src/app/shared/pdf-generate/pdf-generator.service';
import jsPDF from 'jspdf';
import { MatSort } from '@angular/material/sort';
import { ReportDialog } from './report/report';
import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import Drugs from 'src/app/models/drugs.model';

@Component({
  selector: 'app-pages-transactions',
  templateUrl: './transaction.component.html',
  providers: [TransactionService]
})
export class TransactionComponent implements OnInit {
  @ViewChild(MatSort)


  drugsList: Drugs[] = [];
  filteredDrugsList: Drugs[] = [];
  searchTerm = '';

  constructor(public dialog: Dialog,
    public router: Router, public http: HttpClient,) {


  }

  ngOnInit(): void {

    this._fetchData();


  }





  _fetchData() {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const res: any = this.http.get('https://pharmplug-api.onrender.com/api/get-all-products-without-limit', { headers }).toPromise();
      res.then((value: any) => {
        console.log(value['products'])

        this.drugsList = value['products']
        this.filteredDrugsList = value['products']
      })


    } catch (error) {
      console.error(error);
    }
  }
  setSymbol(sym: any) {
    let data = currencySymbol.symbol(sym)
    return data;

  }




  /**
   * Filters transactions based on a search term entered by the drug.
   */
  searchTransactions() {
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









}
