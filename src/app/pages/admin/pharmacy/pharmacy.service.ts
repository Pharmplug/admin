import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PharmService {
 



  constructor(private db: AngularFirestore,public http: HttpClient,) {
  
  }
  async getPharmacies(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.get(`${environment.baseUrl}pharmacy/get-all`, { headers }).toPromise();
      console.log(res); // You can directly log the response here
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
      const res: any = await this.http.put(`${environment.baseUrl}pharmacy/update`, payload, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error:any) {
      console.error(error);
      return error['error']['message']; // Rethrow the error to be caught by the caller
    }
  }
  
  
  async addPharmplug(payload: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.post(`${environment.baseUrl}pharmacy/add-pharmacy`, payload, { headers }).toPromise();
      
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
  

  async deletePharmacy(id: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.post(`${environment.baseUrl}pharmacy/delete-pharmacy`, {"id":id}, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error:any) {
      console.error(error);
      return error['error']['message']; // Rethrow the error to be caught by the caller
    }
  }
}
