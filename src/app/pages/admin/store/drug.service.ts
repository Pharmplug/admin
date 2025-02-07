import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DrugService {
  private dbPath = '/transactions';



  constructor(private db: AngularFirestore,public http: HttpClient,) {
  
  }
  async getStore(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.get(`${environment.baseUrl}store/get-all-products-without-limit`, { headers }).toPromise();
      console.log(res['data']); // You can directly log the response here
      return res['data']
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }

  async update(payload: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.put(`${environment.baseUrl}store/update-one-product`, payload, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error:any) {
      console.error(error);
      return error['error']['message']; // Rethrow the error to be caught by the caller
    }
  }
  
  async deleteProduct(id: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.post(`${environment.baseUrl}store/delete-product`, {"id":id}, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error:any) {
      console.error(error);
      return error['error']['message']; // Rethrow the error to be caught by the caller
    }
  }
  
  async addDrug(payload: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.post(`${environment.baseUrl}store/add-product`, payload, { headers }).toPromise();
      
      if (typeof res.data === 'object') {
        console.log({status:true,data: res.data})
        return{status:true,data: res.data}
      } else  {
        console.log({status:false,data: res.data})
        return{status:false,data: res.data}
      } 
   
    } catch (error) {
      console.error('Error:', error);
      return{status:false,data: error}
    }
  }
  

}
