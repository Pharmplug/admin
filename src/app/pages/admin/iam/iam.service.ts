import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IamService {


  constructor( public http: HttpClient ) {

  }
  async getAllAdmin(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.get(`${environment.baseUrl}all-admins`, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
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
      const res: any = await this.http.put(`${environment.baseUrl}update-admin`, payload, { headers }).toPromise();
      
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


  async addAdmin(payload: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.post(`${environment.baseUrl}add-admin`, payload, { headers }).toPromise();
      
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
  

  async deleteAdmin(id: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const res: any = await this.http.post(`${environment.baseUrl}delete-admin`, id,{headers}).toPromise();
   
      if (typeof res.data === 'object') {
        console.log({status:true,data: res.data})
        return{status:true,data: res.data}
      } else  {
        console.log({status:false,data: res.data})
        return{status:false,data: res.data}
      } 
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }

}