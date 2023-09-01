import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CoverageService {
  private dbPath = '/transactions';



  constructor(public http: HttpClient,) {
  
  }
  async getAll(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.get(`${environment.baseUrl}coverage/get-all`, { headers }).toPromise();
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
      const res: any = await this.http.put(`${environment.baseUrl}coverage/update-one-product`, payload, { headers }).toPromise();
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
      const res: any = await this.http.post(`${environment.baseUrl}coverage/add-location`, payload, { headers }).toPromise();
      
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
  

  delete(id: string) {
  
  }
}
