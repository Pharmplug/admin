import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private dbPath = '/transactions';



  constructor(public http: HttpClient,) {
  
  }
  async getPayments(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.get(`${environment.baseUrl}payments/get-all`, { headers }).toPromise();
      console.log(res['data']); // You can directly log the response here
      return res['data']
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }

  


  delete(id: string) {
  
  }
}
