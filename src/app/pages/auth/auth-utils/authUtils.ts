import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {
  
  }

  async update(payload: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.put(`${environment.baseUrl}update-request`, payload, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }
  


  async getAllAdmin(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.get(`${environment.baseUrl}admin/all-admins`, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }

  async login(payload:any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.post(`${environment.baseUrl}admin/login-admin`,payload, { headers }).toPromise();
      console.log(res); // You can directly log the response here

      if(res.data==='Admin not found') return{status:false,data: 'Admin not found'}
      if(res.data==='Incorrect password') return{status:false,data: 'Incorrect password'}

      return {status:true,data: res.data}
    } catch (error) {
      console.error(error);
      return error; // Rethrow the error to be caught by the caller
    }
  }
  

  

  delete(id: string) {
  
  }
}
