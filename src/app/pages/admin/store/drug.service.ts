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
      const res: any = await this.http.get(`${environment.baseUrl}get-all-products-without-limit`, { headers }).toPromise();
      console.log(res['products']); // You can directly log the response here
      return res['products']
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
      const res: any = await this.http.put(`${environment.baseUrl}update-one-product`, payload, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error:any) {
      console.error(error);
      return error['error']['message']; // Rethrow the error to be caught by the caller
    }
  }
  
  

  

  delete(id: string) {
  
  }
}
