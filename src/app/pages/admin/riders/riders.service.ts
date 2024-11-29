import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/storage';
@Injectable({
  providedIn: 'root'
})
export class RiderService {




  constructor(public http: HttpClient, private tokenService: TokenService) {

  }
  async getRiders(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    };

    try {
      const res: any = await this.http.get(`${environment.baseUrl}riders/all`, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res['data']['rider']
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }
  async getRider(id: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    };

    try {
      const res: any = await this.http.get(`${environment.baseUrl}riders/profile/${id}`, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res['data']['rider']
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }
  async update(id: string, payload: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    };

    try {
      const res: any = await this.http.put(`${environment.baseUrl}riders/profile/${id}`, payload, { headers }).toPromise();
      console.log(res); // You can directly log the response here
      return res; // Return the response
    } catch (error: any) {
      console.error(error);
      return error['error']['message']; // Rethrow the error to be caught by the caller
    }
  }
}
