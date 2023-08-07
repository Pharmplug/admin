
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }


  exportToExcel(transactions:any,head:[],header:[]) {
    const valuesArray: any[][] = transactions.map((transaction: any) => {
      const values: any[]=[];
     
      head.forEach(key => {
        values.push(transaction[key]);
      });
      return values;
    });
    
  

  valuesArray[0]=header

    const data = [    ...valuesArray ];
  
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'Orokii-Transaction-Report.xlsx');
  }
  

  exportToCustomerExcel(transactions:any,head:[],header:[]) {
    const valuesArray: any[][] = transactions.map((transaction: any) => {
      const values: any[]=[];
     
      head.forEach(key => {
        values.push(transaction[key]);
      });
      return values;
    });
    
  

  valuesArray[0]=header

    const data = [    ...valuesArray ];
  
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'Orokii-Customers-Report.xlsx');
  }
  

}