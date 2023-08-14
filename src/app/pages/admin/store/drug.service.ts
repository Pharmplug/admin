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

  getAll(): AngularFirestoreCollection<any> {
    let data= this.db.collection('/transactions', ref => ref.orderBy('created_at','desc'));
    return data;
  }

  async getById(id: string | undefined): Promise<any>{
    let document = await this.db.collection('transactions').doc(id).get();
    return document;
  }

  create(): any {
   
  }

  async update(payload: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.put(`${environment.baseUrl}update-one-product`, payload, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }
  
  

  

  delete(id: string) {
  
  }
}
